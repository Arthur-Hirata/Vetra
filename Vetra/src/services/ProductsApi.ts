const API_URL = "http://localhost:8000"
class ApiError extends Error{
    data:{
        wait_time?:number
        message?: string
    }
    constructor(message:string, data : {wait_time?: number; message?: string}){
        super(message)
        this.data = data
    }
}

export async function getProducts(id:number) {
    const response = await fetch(`${API_URL}/products/${id}`, {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()
    if (!response.ok){
        throw new ApiError(
            data.mensagem || data.message || "Erro pegar produtos",
            data
        )
    } 
    return data
}

export async function getDetailProduct(id:number){
    const response = await fetch(`${API_URL}/products/detail/${id}`, {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()
    if (!response.ok){
        throw new ApiError(
            data.mensagem || data.message || "Erro pegar produtos",
            data
        )
    } 
    return data
}
export async function getCategory(id:number) {
    const response = await fetch(`${API_URL}/products/category/${id}`, {
        method : "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()
    if (!response.ok){
        throw new ApiError(
            data.mensagem || data.message || "Erro pegar categoria",
            data
        )
    }
    return data
}
export async function  getAllProducts() {
    const response = await fetch(`${API_URL}/products/AllProducts`, {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
        }
    })
    const data = await response.json()
    if (!response.ok){
        throw new ApiError(
            data.mensagem || data.message || "Erro pegar categoria",
            data
        )
    }
    return data
}

