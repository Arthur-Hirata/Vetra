import HeroCard from "./HeroCard"



export default function Hero() {
    return (
        <section className="mx-auto mt-8 w-full max-w-6xl px-4 sm:px-6" aria-labelledby="hero-title">
            <div className="grid items-center gap-8 rounded-3xl border border-border bg-cards p-6 shadow-card sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-14">
                <div className="max-w-xl">
                    <span className="inline-flex items-center gap-2 rounded-full bg-card-secondary px-4 py-2 text-sm font-medium text-primary">
                        <i className="fa-solid fa-store" aria-hidden="true" />
                        O seu próximo achado está aqui
                    </span>

                    <h1 id="hero-title" className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-text sm:text-5xl">
                        Tudo que você precisa em um só lugar
                    </h1>

                    <p className="mt-5 max-w-lg text-base leading-7 text-text-secondary sm:text-lg">
                        Descubra produtos, encontre boas oportunidades e conecte-se com quem vende.
                        Tudo em um só lugar.
                    </p>

                    <div className="flex flex-row mt-4 gap-10">
                    <button className="bg-green w-60 h-10 rounded-md text-white transition:transform duration-300 hover:scale-105">Explorar Produtos →</button>
                    <button className="border border-green w-60 h-10 rounded-md text-green transition:transform duration-300 hover:scale-105">Começar a vender</button>
                </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-border">
                <img
                    src="https://img.magnific.com/fotos-gratis/fones-de-ouvido-de-audio-para-ouvir_1203-7566.jpg?semt=ais_hybrid&w=740&q=80"
                    alt="Descrição da imagem"
                    className="-ml-3 h-60 w-full object-cover sm:h-80 lg:h-96"
                />
                </div>
            </div>
            <div className="mt-15 flex flex-row gap-10 -ml-4">
                    <HeroCard children="Seus produtos chegam com toda segurança!" title="Entrega Segura" icon="fa-solid fa-truck"/>
                    <HeroCard children="Seus dados e compras sempre protegidos" title="Pagamento protegido" icon="fa-solid fa-shield-halved"/>
                    <HeroCard children="Pessoas reais, negócios reais, mais oportunidades" title="Comunidade Vetra" icon="fa-solid fa-people-group"/>
            </div>
        </section>
    )
}
