interface HoverSpanProps{
    message:string
    href?:string
}
export default function HoverSpan({message, href}:HoverSpanProps){
    return (
        <a href={href ? `#${href}` : undefined}>
            <span className="inline-block text-green underline-offset-5 transition-transform duration-200 hover:underline hover:scale-105">
                {message}
            </span>
        </a>
    )
}
