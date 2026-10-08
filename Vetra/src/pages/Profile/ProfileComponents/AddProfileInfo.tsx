interface AddInfoProfileProps{
    profile :ProfileData
}

export default function AddInfo({profile} : AddInfoProfileProps){
    return (
        <div className="flex flex-col gap-3">
            <section id="overview" className="border-b border-border pb-6">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary">Minha conta</p>
                    <h1 className="text-3xl font-semibold text-text sm:text-4xl">Altere suas informações</h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">Atualize as suas informações de contato caso precise.</p>
            </section>
            <div className="rounded-md border border-border bg-cards p-5 shadow-card w-200 h-120">
                <p>{profile.name}</p>
            </div>
        </div>
    )
}