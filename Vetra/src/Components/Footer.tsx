export default function Footer(){
    return (
        <footer className="w-full h-30 bg-cards flex flex-row items-center justify-center" >
            <div className="flex flex-col">
                <span className="text-center text-2xl font-bold">Vetra</span>
                <span className="text-sm text-text-secondary">contatoVetra@gmail.com</span>
                <div className="flex gap-5 items-center justify-center mt-2" >
                    <div>
                        <i className="fa-brands fa-github text-2xl"></i>
        
                    </div>
                    <i className="fa-brands fa-linkedin text-2xl"></i>
                </div>
            </div>
        </footer>
    )
}