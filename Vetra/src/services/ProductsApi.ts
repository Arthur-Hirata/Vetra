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
