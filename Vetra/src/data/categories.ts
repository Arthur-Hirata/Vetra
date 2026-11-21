export interface Category {
  id: number
  name: string
  slug: string
  categoryDesc : string
}

export const categories: Category[] = [
  { id: 1, name: "Eletrônicos", slug: "eletronicos", categoryDesc :"Encontre celulares, computadores, acessórios e tudo o que você precisa em tecnologia."},
  { id: 2, name: "Moda e vestuário", slug: "moda", categoryDesc: "ncontre roupas, calçados e acessórios para todos os estilos e ocasiões."},
  { id: 3, name: "Esportes e lazer", slug: "esportes", categoryDesc:"Descubra móveis, itens decorativos e tudo para deixar seu ambiente do seu jeito." },
  { id: 4, name: "Casa e decoração", slug: "casa", categoryDesc:"Confira equipamentos, acessórios e artigos para suas atividades favoritas." },
]

