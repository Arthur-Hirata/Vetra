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



@router.get("/{id}")
async def getProduct(id):
    product_result = (
        supabase.table("products")
        .select("title, quantity, price, seller_id, category_id, image_url, condition")
        .eq("id", id)
        .execute()
    )

    if not product_result.data:
        return JSONResponse(
            status_code=404,
            content={"message": "Produto não encontrado"}
        )

    product = product_result.data[0]

    seller_result = (
        supabase.table("users")
        .select("name, avatar_url, address")
        .eq("id", product["seller_id"])
        .execute()
    )

    if not seller_result.data:
        return JSONResponse(
            status_code=404,
            content={"message": "Vendedor não encontrado"}
        )

    seller = seller_result.data[0]

    categories = {
        1: "Eletrônicos",
        2: "Vestuario",
        3: "Esportes",
        4: "Móveis",
    }

    return {
        "id": id,
        "title": product["title"],
        "quantity": product["quantity"],
        "price": product["price"],
        "image_url": product["image_url"],
        "condition": product["condition"],
        "category": categories.get(product["category_id"]),
        "seller": {
            "id": product["seller_id"],
            "name": seller["name"],
            "avatar_url": seller["avatar_url"],
            "address": seller["address"],
        },
    }

@router.get("/detail/{id}")
async def getDetailProduct(id):
    product_result = (
            supabase.table("products")
            .select("title, quantity, price, seller_id, category_id, image_url, condition, description, subtitle")
            .eq("id", id)
            .execute()
    )
    if not product_result.data:
            return JSONResponse(
                status_code=404,
                content={"message": "Produto não encontrado"}
            )
    product = product_result.data[0]
    seller_result = (
        supabase.table("users")
        .select("name, avatar_url, address")
        .eq("id", product["seller_id"])
        .execute()
    )
    if not seller_result.data:
            return JSONResponse(
                status_code=404,
                content={"message": "Vendedor não encontrado"}
            )
    
    seller = seller_result.data[0]
    
    categories = {
        1: "Eletrônicos",
        2: "Vestuario",
        3: "Esportes",
        4: "Móveis",
        }

    return {
        "id": id,
        "title": product["title"],
        "quantity": product["quantity"],
        "price": product["price"],
        "image_url": product["image_url"],
        "condition": product["condition"],
        "subtitle" : product['subtitle'],
        "description" : product['description'],
        "category": categories.get(product["category_id"]),
        "seller": {
            "id": product["seller_id"],
            "name": seller["name"],
            "avatar_url": seller["avatar_url"],
            "address": seller["address"],
        },
    }