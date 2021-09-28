import productModel from "./productModel"
import { ProductSchema } from "./schemas"

export const getAllProducts = async () => productModel.find()

export const getProductByID = async (productID: string) => productModel.findOne({ _id: productID })

export const createProduct = async (product: ProductSchema) => productModel.create(product)

export const updateProduct = async (productID: string, product: ProductSchema) => {
  await productModel.updateOne({ _id: productID }, {
    $set: {
      name: product.name,
      description: product.description,
      price: product.price,
    }
  })
}

export const deleteProduct = async (productID: string) => productModel.deleteOne({ _id: productID })
