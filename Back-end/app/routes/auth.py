from fastapi import APIRouter
from app.config import SECRET_KEY
from app.database import supabase
router = APIRouter()

@router.post("/register")
async def register():
    return

@router.post("/login")
async def login():
    return 

