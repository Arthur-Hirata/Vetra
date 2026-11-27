
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

type SortOrder = "recent" | "lowest" | "highest"

interface Product {
    id: number
    title: string
    category: string
    condition: "Novo" | "Usado"
    price: number
    seller: string
    location: string
    icon: string
}

const products: Product[] = [
    { id: 1, title: "Fone Bluetooth sem fio", category: "Eletrônicos", condition: "Novo", price: 189.9, seller: "Mariana Costa", location: "São Paulo, SP", icon: "fa-headphones" },
    { id: 2, title: "Câmera instantânea", category: "Eletrônicos", condition: "Usado", price: 349.9, seller: "Lucas Almeida", location: "Campinas, SP", icon: "fa-camera" },
    { id: 3, title: "Mochila urbana", category: "Acessórios", condition: "Novo", price: 129.9, seller: "Beatriz Lima", location: "Curitiba, PR", icon: "fa-bag-shopping" },
    { id: 4, title: "Tênis casual", category: "Moda", condition: "Usado", price: 219.9, seller: "Rafael Souza", location: "Rio de Janeiro, RJ", icon: "fa-shoe-prints" },
    { id: 5, title: "Teclado mecânico", category: "Eletrônicos", condition: "Novo", price: 279.9, seller: "Pedro Santos", location: "Belo Horizonte, MG", icon: "fa-keyboard" },
    { id: 6, title: "Luminária de mesa", category: "Casa e decoração", condition: "Novo", price: 94.9, seller: "Ana Oliveira", location: "Florianópolis, SC", icon: "fa-lightbulb" },
    { id: 7, title: "Relógio esportivo", category: "Esportes e lazer", condition: "Usado", price: 159.9, seller: "Gabriel Martins", location: "Porto Alegre, RS", icon: "fa-stopwatch" },
    { id: 8, title: "Óculos de sol", category: "Moda", condition: "Novo", price: 119.9, seller: "Isabela Ferreira", location: "Santos, SP", icon: "fa-glasses" },
]

function formatPrice(price: number) {
    return price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}

export default function AllProducts() {
    const navigate = useNavigate()
    const [search, setSearch] = useState("")
    const [sortOrder, setSortOrder] = useState<SortOrder>("recent")

    const visibleProducts = useMemo(() => {
        const searchTerm = search.trim().toLocaleLowerCase("pt-BR")
        const filteredProducts = products.filter((product) =>
            `${product.title} ${product.category}`.toLocaleLowerCase("pt-BR").includes(searchTerm),
        )

        if (sortOrder === "lowest") {
            return filteredProducts.sort((a, b) => a.price - b.price)
        }

        if (sortOrder === "highest") {
            return filteredProducts.sort((a, b) => b.price - a.price)
        }

        return filteredProducts
    }, [search, sortOrder])

    return (
        <div className="mx-auto mb-24 flex w-full max-w-6xl flex-col px-4 sm:px-6">
            <div className="flex flex-row gap-10 mt-4 items-center">
                <i className="fas fa-house trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer text-green text-2xl" onClick={() =>navigate("/")}></i>
                <p>{'>'}</p>
                <p className="trasnform:transition duration-300 hover:scale-105 hover:cursor-pointer">Categorias</p>
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

            <section className="mt-8" aria-labelledby="products-heading">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 id="products-heading" className="text-2xl font-bold text-text">Produtos</h2>
                        <p className="mt-1 text-sm text-text-secondary">
                            {visibleProducts.length} {visibleProducts.length === 1 ? "produto encontrado" : "produtos encontrados"}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <label className="relative block">
                            <span className="sr-only">Buscar produtos</span>
                            <i className="fas fa-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-text-secondary" aria-hidden="true" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Buscar produtos"
                                className="h-12 w-full rounded-xl border border-border bg-white pl-11 pr-4 text-sm text-text shadow-[0_4px_12px_rgba(30,41,59,0.03)] outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10 sm:w-72"
                            />
                        </label>

                        <label>
                            <span className="sr-only">Ordenar produtos</span>
                            <select
                                value={sortOrder}
                                onChange={(event) => setSortOrder(event.target.value as SortOrder)}
                                className="h-12 w-full cursor-pointer rounded-xl border border-border bg-white px-4 text-sm text-text outline-none focus:border-green sm:w-auto"
                            >
                                <option value="recent">Mais recentes</option>
                                <option value="lowest">Menor preço</option>
                                <option value="highest">Maior preço</option>
                            </select>
                        </label>
                    </div>
                </div>

                {visibleProducts.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {visibleProducts.map((product) => (
                            <article
                                key={product.id}
                                className="overflow-hidden rounded-xl border border-border bg-white shadow-card transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div className="relative flex h-48 items-center justify-center bg-greenBg/50">
                                    <i className={`fa-solid ${product.icon} text-6xl text-green/70`} aria-hidden="true" />
                                    <span className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium ${product.condition === "Novo" ? "bg-greenBg text-green" : "bg-amber-100 text-amber-700"}`}>
                                        {product.condition}
                                    </span>
                                </div>

                                <div className="p-4">
                                    <p className="text-xs font-medium text-text-secondary">{product.category}</p>
                                    <h3 className="mt-1 truncate font-semibold text-text">{product.title}</h3>
                                    <p className="mt-3 text-xl font-bold text-green">{formatPrice(product.price)}</p>
                                    <div className="mt-4 flex items-center gap-3 border-t border-border pt-3">
                                        <img src="/foto.jpg" alt="" className="h-9 w-9 rounded-full object-cover" />
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium text-text">{product.seller}</p>
                                            <p className="truncate text-xs text-text-secondary">
                                                <i className="fas fa-location-dot mr-1" aria-hidden="true" />
                                                {product.location}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="mt-6 rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center">
                        <i className="fas fa-box-open text-3xl text-text-secondary" aria-hidden="true" />
                        <p className="mt-3 font-semibold text-text">Nenhum produto encontrado</p>
                        <p className="mt-1 text-sm text-text-secondary">Tente buscar por outro nome ou categoria.</p>
                    </div>
                )}
            </section>
        </div>
    )
}