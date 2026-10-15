interface SectionTittleProps{
    title:string
    children: string
    refText:string
    ref?:string
}


export default function SectionTittle({children, title, refText, ref}: SectionTittleProps){
    return(
        <div>
            <span className="text-green font-bold text-xl">{title}</span>
            <div className="flex flex-row justify-between">
                <span className="text-2xl font-semibold text-center flex justify-items-center">{children}</span>
                <div className="flex gap-2 text-green font-bold transition:transform duration-300 hover:scale-105 hover:cursor-pointer">
                    <span>{refText}</span>
                    <a href={ref}><i className="fas fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    )
}