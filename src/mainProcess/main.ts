import { app, BrowserWindow, ipcMain as ipc } from 'electron'
import mongoose from "mongoose"

import { checkForUpdates } from './checkForUpdates'
import { createLogger, stopLogger } from '../lib/logger'
import { appUrl } from '../lib/paths'
import {createProduct, deleteProduct, getAllProducts, getProductByID, updateProduct} from "./product/productService"
import {ProductSchema, UpdateProductSchema } from "./product/schemas"

const logger = createLogger(`main`)

process.on(`uncaughtException`, error => {
  logger.fatal(error)
})

process.on(`unhandledRejection`, error => {
  logger.error(error)
})

process.on(`exit`, () => {
  stopLogger()
})

app.disableHardwareAcceleration()

const handlers = {
  'appVersion': app.getVersion
}

for (const [key, handler] of Object.entries(handlers)) {
  ipc.handle(key, handler)
}

ipc.handle(`createProduct`, async (event, product: ProductSchema) => {
  try {
    await createProduct(product)
    return { success: `Produto criado com sucesso` }
  } catch (e) {
    return { error: `Não foi possível criar o produto` }
  }
})

ipc.handle(`updateProduct`, async (event, product: UpdateProductSchema) => {
  try {
    const { id, ...data } = product
    await updateProduct(id, data)
    return { success: `Produto atualizado com sucesso` }
  } catch (e) {
    return { error: `Não foi possível atualizar o produto` }
  }
})

ipc.handle(`getAllProducts`, async () => getAllProducts())

ipc.handle(`getProduct`, async (event, id) => getProductByID(id))

ipc.handle(`deleteProduct`, async (event, id) => {
  try {
    await deleteProduct(id)
    return { success: `Produto deletado com sucesso` }
  } catch (e) {
    return { error: `Não foi possível deletar o o produto` }
  }
})


const run = async () => {
  logger.info(`Waiting for ready state...`)

  const DB_CONNECTION_STRING = `mongodb://localhost:27017/test`

  await mongoose.connect(DB_CONNECTION_STRING, {
    autoIndex: true
  })
  
  await app.whenReady()
  await checkForUpdates()

  const _window = new BrowserWindow({
    width: 960,
    minWidth: 960,
    height: 600,
    minHeight: 600,
    frame: false,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true,
      webSecurity: false
    }
  })

  await _window.loadURL(appUrl)
  await _window.show()

  logger.info(`App is ready.`)
}

run()