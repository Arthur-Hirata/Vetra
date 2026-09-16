from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.config import SECRET_KEY
from app.database import supabase
from pydantic import BaseModel
from werkzeug.security import generate_password_hash, check_password_hash
router = APIRouter()

class userAuth(BaseModel):
    email:str
    password : str



@router.post("/register")
async def register(user:userAuth):
    email = user.email
    password = user.password
    password_hash = generate_password_hash(password)

    response = supabase.table("users").insert({
        "email" : email,
        "password_hash" : password_hash
    }).execute()

    return {
        "message" : "usuário cadastrado, deu certo",
        "response" : response
    }

@router.post("/login")
async def login(user: userAuth):
    email = user.email
    password = user.password

    response = supabase.table("users").select("password_hash").eq("email", email).execute()

    if not response.data:
        return JSONResponse(
            status_code=404,
            content={"message" : "Usuário não encontrado"})
    
    password_hash = response.data[0]["password_hash"]

    if check_password_hash(password_hash, password):
        return {"message" : "Usuário loggado com sucesso"}
    else:
        return JSONResponse(
            status_code=401,
            content={"message" : "Senha incorreta"}
        )


