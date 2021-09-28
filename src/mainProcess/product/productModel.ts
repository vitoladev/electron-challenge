import mongoose, { Document } from "mongoose"

const productSchema = new mongoose.Schema({
  name: { required: true, type: String },
  description: { required: true, type: String },
  price: { required: true, type: Number }
})

interface IProduct extends Document {
    name: string;
    description: string;
    price: number;
}

const PRODUCT_MODEL_NAME = `product`

const productModel = mongoose.model<IProduct>(PRODUCT_MODEL_NAME, productSchema)

export default productModel