import React, { useState, useEffect } from 'react'
import { Container, IconButton, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { FaRegEdit, FaTrash } from "react-icons/fa"
import { IProduct } from './types'
import axios from 'axios'

import CreateProduct from './CreateProduct'

const ListAllProducts: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([{
    name: `Teste`,
    description: `é um otimo produto, recomendo Loremiroeitejrsitofdkiaosfkdsofkdsafoas!`,
    price: 20
  }])

  useEffect(() => {
    async function getProducts() {
      // const response = await axios.get(`http://localhost:8000/products`)
      const allProducts = await getAllProducts()
      setProducts(allProducts)
    }

    getProducts()
  })

  return (
    <Container justifyContent="center" alignItems="center">
      <CreateProduct />
      <Table variant="striped" colorScheme="teal">
        <TableCaption placement="top">Produtos</TableCaption>
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th isNumeric>Preço</Th>
            <Th colSpan={2}>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map(({ name, description, price}) => <Tr>
            <Td>{name}</Td>
            <Td>{description}</Td>
            <Td>R${price}</Td>
            <Td>
              <IconButton size="sm" aria-label="Editar produto" icon={<FaRegEdit />} />
            </Td>
            <Td>
              <IconButton size="sm" aria-label="Remover produto" icon={<FaTrash />} />
            </Td>
          </Tr>
          )}
        </Tbody>
      </Table>
    </Container>
  )
}

export default ListAllProducts
