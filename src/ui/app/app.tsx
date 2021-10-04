import React from 'react'
import './app.scss'
import ListAllProducts from '../app/modules/Product/ListAllProducts'
import { ChakraProvider } from "@chakra-ui/react"

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ListAllProducts />
    </ChakraProvider>
  )
}