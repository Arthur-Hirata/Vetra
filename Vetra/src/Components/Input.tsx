interface InputProps{
    placeholder: string
    type : string
    subTittle : string
}

export default function Input({placeholder, type, subTittle}: InputProps){
    return (
        <div className="flex flex-col gap-3">
            <span className="">{subTittle}</span>
            <input type={type} placeholder={placeholder} />

        </div>
    )
}