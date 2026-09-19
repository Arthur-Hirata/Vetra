
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

export async function login(email:string, password: string, remember: boolean) {
    const response = await fetch(`${API_URL}/auth/login`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials : "include",
        body : JSON.stringify({
            email:email,
            password : password,
            remember : remember
        }),
    })
    const data = await response.json()
    if (!response.ok){
        throw new ApiError(
            data.mensagem || data.message || "Erro ao fazer login",
            data
        )
    } 
    return data
}

export async function register(email:string, password:string, name:string) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            email: email,
            password : password,
            name: name
        })
    })
    const data = await response.json()
    if (!response.ok){
        throw new ApiError(
            data.mensagem || data.message || "Erro ao fazer login",
            data
        )
    } 
    return data
    
}

export async function getCurrentUser() {
    const response = await fetch(`${API_URL}/auth/userValidation`, {
        method : "POST",
        credentials : "include"
    })
    const data = await response.json() 
    
    if (!response.ok){
        throw new Error(data.messagem || "Não autenticado")
    }
    return data
}