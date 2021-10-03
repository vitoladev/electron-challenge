import mongoose from "mongoose"

const DB_CONNECTION_STRING = `mongodb://localhost:27017/valore`

export const connectDatabase = async () => mongoose.connect(DB_CONNECTION_STRING)
