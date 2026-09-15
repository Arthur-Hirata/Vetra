from fastapi import APIRouter
from app.config import SECRET_KEY
from app.database import supabase
from pydantic import BaseModel
from werkzeug.security import generate_password_hash
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
    print(response)

    return {
        "mensagem" : "usuário cadastrado, deu certo",
        "response" : response
    }

@router.post("/login")
async def login(user: userAuth):

    return 

