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
    remember : Optional[bool] = None
    name : Optional[str] = None






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

    db_response = supabase.table("users").select("password_hash, id, role, name, avatar_url").eq("email", email).execute()

    if not db_response.data:
        return JSONResponse(
            status_code=404,
            content={"message" : "Usuário não encontrado"})
    usuario = db_response.data[0]
    password_hash = usuario["password_hash"]
    user_id = usuario['id']
    user_role = usuario['role']
    user_name = usuario['name']
    user_avatar = usuario['avatar_url']
    if check_password_hash(password_hash, password):
        max_idade_cookie = 345600 if user.remember else 7200
        payload ={
            'sub' : str(user_id),
            'email' : email,
            'name' : user_name,
            'role' : user_role,
            'user_avatar' : user_avatar,
            'exp' :datetime.now(timezone.utc) + timedelta(hours= 96 if user.remember else 2 )
        }
        jwt_Token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
        response.set_cookie(
            key = "access_token",
            value = f"Bearer {jwt_Token}".strip(),
            httponly = True,
            max_age = max_idade_cookie,
            samesite = "lax",
            secure = False
        )
        return {"message" : "Usuário loggado com sucesso"}
    else:
        return JSONResponse(
            status_code=401,
            content={"message" : "Senha incorreta"}
        )


@router.get("/profile")
async def userProfile(request: Request):
    cookies = request.cookies.get("access_token")

    token = cookies.removeprefix("Bearer ")

    payload = jwt.decode(
        token,
        SECRET_KEY,
        algorithms=['HS256']
    )
    email = payload['email']



    db_response = supabase.table("users").select("name, address, email").eq("email", email).execute()
    usuario = db_response.data[0]


    return {"User" : usuario}

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