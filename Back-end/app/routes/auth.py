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
    cookie = request.cookies.get("access_token")
    response.delete_cookie(
        key="access_token",
        httponly=True,
        samesite="lax",
        secure=False
    )
    return JSONResponse(
        status_code=200,
        content={"mensagem": "logout realizado"}
    )




    
@router.post("/register")
@rate_limit(req_limit=5, time_skip=300)
async def register(request:Request, user:userAuth):
    email = user.email
    password = user.password
    name = user.name
    password_hash = generate_password_hash(password)
    try:
        response = supabase.table("users").insert({
        "email" : email,
        "password_hash" : password_hash,
        "name" : name
        }).execute()

        return {
        "message" : "usuário cadastrado, deu certo",
        "response" : response
        }
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

    db_response = supabase.table("users").select("password_hash, id, role, name").eq("email", email).execute()

    if not db_response.data:
        return JSONResponse(
            status_code=404,
            content={"message" : "Usuário não encontrado"})
    usuario = db_response.data[0]
    password_hash = usuario["password_hash"]
    user_id = usuario['id']
    user_role = usuario['role']
    user_name = usuario['name']
    if check_password_hash(password_hash, password):
        max_idade_cookie = 345600 if user.remember else 7200
        payload ={
            'sub' : str(user_id),
            'email' : email,
            'name' : user_name,
            'role' : user_role,
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


