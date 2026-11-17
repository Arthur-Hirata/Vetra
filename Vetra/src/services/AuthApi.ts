
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
        credentials : "include",
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
        throw new Error(data.message || "Não autenticado")
    }
    return data
}
export async function Logout() {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method : 'POST',
         credentials : "include"
    })
    const data = await response.json()
    if (!response.ok){
        throw new Error (data.message || "Erro ao fazer logout")
    }
    return data
}

export async function getProfile() {
    const response = await fetch(`${API_URL}/auth/profile`, {
        method : "GET",
        credentials : "include"
    })
    const data = await response.json()
    if (!response.ok){
        throw new Error (data.message || 'Erro ao pegar informações do usuário')
    }
    return data
}
export async function deleteUser() {
    const response = await fetch(`${API_URL}/auth/exclude`, {
        method : 'DELETE',
        credentials : "include"
    })
    const data = await response.json()
    if (!response.ok){
        throw new Error (data.message || "Erro ao excluir usuário")
    }
    return data
}
export async function updateUser(name:string, address: string, CPF:string, avatar_url:string) {
    const response = await fetch(`${API_URL}/auth/updateInfo`, {
        method : 'PATCH',
        credentials : "include",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            name:name,
            address:address,
            CPF:CPF,
            avatar_url:avatar_url
        })
    })
    const data = await response.json()
    if (!response.ok){
        throw new Error (data.message || "Erro ao excluir usuário")
    }
    return data
}