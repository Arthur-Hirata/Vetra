
const API_URL = "http://127.0.0.1:8000"


export async function login(email:string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`,{
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            email:email,
            password : password
        }),
    })
    const data = await response.json()
    if (!response.ok){
        throw new Error(data.mensagem || "Erro ao fazer login")
    } 
    return data
}

export async function register(email:string, password:string) {
    const response = await fetch(`${API_URL}/auth/register`, {
        method : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            email: email,
            password : password
        })
    })
    const data = await response.json()
    if (!response.ok){
        throw new Error(data.mensagem || "Erro ao criar conta")
    }
    return data
    
}