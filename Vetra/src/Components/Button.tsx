interface ButtonProps{
    children?: React.ReactNode,
    onClick? : () => void,
    className? : string
}

function Button({children, onClick, className}: ButtonProps){
    return (
        <button className={`${className} rounded-2xl bg-primary text-white w-30 h-7`}
        
        onClick={onClick}>
            {children}
        </button>
    )
}
export default Button