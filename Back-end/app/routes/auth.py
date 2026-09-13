from fastapi import APIRouter
from config import SECRET_KEY
from database import supabase
router = APIRouter()

@router.post("/register")
async def register():
    return

