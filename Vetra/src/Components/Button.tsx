interface ButtonProps{
    children?: React.ReactNode,
    onClick? : () => void,
    className? : string,
    disabled?: boolean
}

function Button({children, onClick, className, disabled = false}: ButtonProps){
    return (
        <button className={`${className} rounded-2xl bg-primary text-white w-30 h-7 transition:transform duration-300 hover:scale-105
            ${disabled 
                ? "bg-gray-400 cursor-not-allowed opacity-60"
                : "bg-primary cursor-pointer hover:scale-105"
            }
        `}
        disabled={disabled}
        onClick={onClick}>
            {children}
        </button>
    )
}
export default Button