export interface Category {
  id: number
  name: string
  slug: string
}

export const categories: Category[] = [
  { id: 1, name: "Eletrônicos", slug: "eletronicos" },
  { id: 2, name: "Vestuário", slug: "vestuario" },
  { id: 3, name: "Esportes", slug: "esportes" },
  { id: 4, name: "Móveis", slug: "moveis" },
]

