from fastapi import APIRouter
from fastapi.responses import JSONResponse
from app.database import supabase
import random
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
@router.get("/category/{section_id}")
def getSection(section_id:int):


    productList = (
         supabase.table("products")
         .select("*")
         .eq("category_id", section_id)
         .execute()
    )
    if not productList.data:
        return JSONResponse(
            status_code=404,
            content={"message": "Nenhum produto encontrado nesta seção"},
        )
    return productList.data

@router.get("/AllProducts")
def getAllProducts():
    res_ids = supabase.table("products").select("id").execute()
    todos_ids = [item['id'] for item in res_ids.data]
    if not todos_ids:
        return []
    else:
        quantity = min(50, len(todos_ids))
        ids_sorteados = random.sample(todos_ids, quantity)

        db_response = supabase.table("products").select("*").in_("id", ids_sorteados).execute()
        ramdon_lines = db_response.data
        random.shuffle(ramdon_lines)
        return ramdon_lines
        