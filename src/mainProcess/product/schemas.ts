import {z} from "zod"

export const productSchema = z.object({
  name: z.string().nonempty(`O produto deve ter um nome`),
  description: z.string().nonempty(`O produto deve ter uma descrição`),
  price: z.number().positive(`O preço do produto não pode ser negativo`),
})

export type ProductSchema = z.infer<typeof productSchema>