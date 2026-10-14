from fastapi import APIRouter, Response, Request
from fastapi.responses import JSONResponse
from app.config import SECRET_KEY
from app.database import supabase
from app.middleware.middleware import rate_limit
from pydantic import BaseModel
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta, timezone
import jwt
from typing import Optional
from functools import wraps
from postgrest.exceptions import APIError
router = APIRouter()

class userAuth(BaseModel):
    email:str
    password : str
    remember : Optional[bool] = False
    name : Optional[str] = None


class userInfoAdd(BaseModel):
    name :Optional[str] = None
    CPF : Optional[str] = None
    avatar_url : Optional[str] = None
    address :Optional[str] = None

TOKEN_TTL = {
    False: timedelta(hours=2),
    True: timedelta(hours=96),
}
def aumentarToken(email: str) -> int:
    result = (
        supabase.table("users")
        .select("token_version")
        .eq("email", email)
        .execute()
    )
    if not result.data:
        raise ValueError("Usuário não encontrado")
    current_token = result.data[0]["token_version"] or 0
    new_token = current_token + 1
    supabase.table("users").update(
        {"token_version": new_token}
    ).eq("email", email).execute()
    return new_token


def generateNewToken(user: dict, token_version: int, remember: bool) -> str:
    payload = {
        "sub": str(user["id"]),
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
        "user_avatar": user["avatar_url"],
        "token_version": token_version,
        "remember": remember,
        "exp": datetime.now(timezone.utc) + TOKEN_TTL[remember],
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def validateSession( email :str ,request_token) -> bool:
    db_response = supabase.table("users").select("token_version").eq("email", email).execute()
    if not db_response.data:
        return False
    token_version = db_response.data[0]['token_version']
    if request_token == token_version:
        return True
    else:
        return False
    
def validateToken(token:str) -> Optional[dict]:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
    except jwt.InvalidTokenError:
        return None
    except jwt.ExpiredSignatureError:
            return None

    
@router.post("/userValidation")
async def userValidation(request: Request):
    cookie = request.cookies.get("access_token")

    if not cookie:
        return JSONResponse(
            status_code=401,
            content={"message" : "Token ausente"}
        )
    token = cookie.removeprefix("Bearer ")
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"]
        )
        return {
            "authenticated" : True,
            "user" : payload
        }
    except jwt.ExpiredSignatureError:
        return JSONResponse(
            status_code=401,
            content={"message": "Token expirado"}
        )

@router.post("/logout")
async def Logout(request:Request,response : Response):
    response.delete_cookie("access_token")
    return {"message" : "Logout Realizado"}

@router.post("/register")
@rate_limit(req_limit=5, time_skip=300)
async def register(request:Request, user:userAuth, response:Response):
    email = user.email
    password = user.password
    name = user.name
    password_hash = generate_password_hash(password)
    try:
        db_response = supabase.table("users").insert({
        "email" : email,
        "password_hash" : password_hash,
        "name" : name
        }).select('id,avatar_url,role').execute()
        user_id = db_response.data[0]['id']
        user_avatar = db_response.data[0]['avatar_url']
        user_role = db_response.data[0]['role']
        payload = {
            'sub' : str(user_id),
            'email' : email,
            'name': name,
            'role': user_role,
            'user_avatar': user_avatar,
            'token_version' : 0,
            'exp' :datetime.now(timezone.utc) + timedelta(hours= 96)
        }
        jwt_Token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        response.set_cookie(
                key = "access_token",
                value = f"Bearer {jwt_Token}".strip(),
                httponly = True,
                max_age = 345600,
                samesite = "lax",
                secure = False
            )
        return {"message": "Usuário cadastrado com sucesso"}
    except APIError as error:
        if error.code == "23505":
            return JSONResponse(
                status_code=409,
                content={"message": "Usuário já cadastrado"}
            )
        return JSONResponse(
            status_code=500,
            content={"message" : "Erro ao cadastrar usuário"}
        )

@router.post("/login")
@rate_limit(req_limit=5, time_skip=600)
async def login(request:Request, user: userAuth, response : Response):
    email = user.email
    password = user.password

    db_response = supabase.table("users").select("password_hash, id, email, role, name, avatar_url").eq("email", email).execute()
    if not db_response.data:
        return JSONResponse(
            status_code=404,
            content={"message" : "Usuário não encontrado"})
    usuario = db_response.data[0]
    password_hash = usuario["password_hash"]
    
    if not check_password_hash(password_hash, password):
        return JSONResponse(
            status_code=401,
            content={"message" : "Senha incorreta"}
        )

    remember = user.remember is True
    token_version = aumentarToken(email)
    token = generateNewToken(usuario, token_version, remember)
    max_idade_cookie = int(TOKEN_TTL[remember].total_seconds())
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        max_age=max_idade_cookie,
        samesite="lax",
        secure=False,
    )
    return {"message" : "Usuário loggado com sucesso"}
@router.get("/profile")
async def userProfile(request: Request):
    cookies = request.cookies.get("access_token")
    if not cookies:
        return JSONResponse(status_code=401, content={"message" : "Token ausente"})
    payload = validateToken(cookies.removeprefix("Bearer "))
    if payload is None:
        error_response = JSONResponse(status_code=401, content={"message" : "Token não autenticado"})
        error_response.delete_cookie("access_token", path="/")
        return error_response

    if not validateSession(payload['email'], payload['token_version']):
        error_response = JSONResponse(status_code=401, content={"message" : "Sessão expirada"})
        error_response.delete_cookie("access_token", path="/")
        return error_response

    email = payload['email']

    db_response = supabase.table("users").select("name, address, email, CPF, avatar_url").eq("email", email).execute()
    usuario = db_response.data[0]

    return {"User" : usuario}

@router.patch("/updateInfo")
async def UpdateInfo(request: Request, user:userInfoAdd, response:Response):
    cookies = request.cookies.get("access_token") 
    if not cookies:
        return JSONResponse(status_code=401, content={"message" : "Token ausente"})
    payload = validateToken(cookies.removeprefix("Bearer "))
    if payload is None:
        error_response = JSONResponse(status_code=401, content={"message" : "Token não autenticado"})
        error_response.delete_cookie("access_token", path="/")
        return error_response

    if not validateSession(payload['email'], payload['token_version']):
        error_response = JSONResponse(status_code=401, content={"message" : "Token incorreto"})
        error_response.delete_cookie("access_token", path="/")
        return error_response
    email = payload['email']
    updates = user.model_dump(exclude_unset = True)
    if not updates:
        return JSONResponse(status_code=400, content={"message": "Nenhuma informação enviada"})
    patchUser= (
        supabase.table("users")
        .update(updates)
        .eq("email", email)
        .select("name, address, email, CPF, avatar_url, token_version")
        .execute()
    )
    user_result = (
        supabase.table("users")
        .select("id, email, name, role, avatar_url")
        .eq("email", email)
        .execute()
    )
    remember = payload['remember']
    user_token_version = aumentarToken(email=email)
    newToken =generateNewToken(user_result.data[0], user_token_version, remember)
    response.set_cookie(
        key = "access_token",
        value = f"Bearer {newToken}".strip(),
        httponly = True,
        max_age = 345600,
        samesite = "lax",
        secure = False
                )
    return {"User": patchUser.data[0]}


@router.delete("/exclude")
async def excludeUser(request:Request):
    cookies = request.cookies.get("access_token")
    if not cookies:
        return JSONResponse(status_code=401, content={"message": "Usuário não autenticado"})
    token = cookies.removeprefix("Bearer ")
    if not cookies:
        return JSONResponse(
            status_code=401,
            content={"message": "Usuário não autenticado"}
        )
    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=['HS256']
    )
    email = payload['email']
    db_response = supabase.table("users").delete().eq('email', email).execute()
    if not db_response.data:
        return JSONResponse(
            status_code=401,
            content={"message" : "Erro ao excluir usuário"}
        )
    response = JSONResponse(
        status_code=200,
        content={"message" : "Usuário exluido com sucesso!"}
    )
    response.delete_cookie("access_token")
    return {"message" : "Usuário excluido com sucesso"}