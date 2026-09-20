export default function Footer(){
    return (
        <footer className="w-full h-30 bg-cards flex flex-row items-center justify-center" >
            <div className="flex flex-col">
                <span className="text-center text-2xl font-bold">Vetra</span>
                <span className="text-sm text-text-secondary">contatoVetra@gmail.com</span>
                <div className="flex gap-5 items-center justify-center mt-2" >
                    <div className="w-10 h-10 rounded-2xl transition:transform duration-300 hover:scale-105 ">
                        <a href="https://github.com/Arthur-Hirata"><i className="fa-brands fa-github text-2xl flex items-center"></i></a>
        
                    </div>
                    <div className="w-10 h-10 rounded-md transition:transform duration-300 hover:scale-105">
                        <a href="https://www.linkedin.com/in/arthur-duarte-hirata/"><i className="fa-brands fa-linkedin text-2xl"></i></a>

                    </div>
                </div>
            </div>
        </footer>
    )
}