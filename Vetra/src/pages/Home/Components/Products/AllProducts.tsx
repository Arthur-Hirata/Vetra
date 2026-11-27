import { useNavigate } from "react-router-dom"



export default function AllProducts() {
    const navigate = useNavigate()

    return (
        <div className="mx-auto mb-24 flex w-full max-w-6xl flex-col px-4 sm:px-6">
            <div className="flex flex-row gap-10 mt-4 items-center">
                <i className="fas fa-house trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer text-green text-2xl" onClick={() =>navigate("/")}></i>
                <p>{'>'}</p>
                <p className="text-green trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">Produtos</p>
            </div>
            <section className="relative mt-8 overflow-hidden rounded-2xl bg-card-secondary px-6 py-8 sm:px-9 sm:py-10">
                <div className="relative z-10 max-w-2xl">
                    <span className="text-sm font-semibold uppercase tracking-wider text-green">
                        Vetra marketplace
                    </span>
                    <h1 className="mt-2 text-3xl font-bold text-text sm:text-4xl">
                        Todos os produtos
                    </h1>
                    <p className="mt-3 max-w-lg text-text-secondary">
                        Explore achados de diferentes categorias e encontre algo que combina com você.
                    </p>
                </div>
                <div aria-hidden="true" className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-secondary/30" />
                <div aria-hidden="true" className="absolute -bottom-24 right-32 h-48 w-48 rounded-full bg-green/10" />
            </section>
           <div className="flex items-center justify-between mt-8">

                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-bold text-text">
                        Produtos
                    </h2>

                    <p className="text-sm text-text-secondary">
                        Explore os produtos desta categoria
                    </p>
                </div>
                <div className="relative hidden sm:block">
                <i className="fas fa-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary" aria-hidden="true" />
                <input 
                    type="text" placeholder="Pesquise o produto que deseja"     
                    className="w-120 text-center  h-12 rounded-xl border border-border bg-white px-4 text-sm text-text placeholder:text-text-secondary shadow-[0_4px_12px_rgba(30,41,59,0.03)] transition-all duration-200 outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
                </div>
                <select className="bg-white border border-border rounded-lg px-4 py-2.5 text-sm text-text outline-none focus:border-green cursor-pointer"
                    
                                >
                    <option value="lowest">Menor preço</option>
                    <option value="highest">Maior preço</option>
                </select>

            </div>
        </div>
    )
}