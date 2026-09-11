interface SectionTittleProps{
    children: string
}


export default function SectionTittle({children}: SectionTittleProps){
    return(
        <div>
            <span className="text-2xl font-semibold text-center flex justify-items-center">{children}</span>
        </div>
    )
}