import React, { useState, useEffect } from 'react'
import { Center, Container, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import { ipcRenderer as ipc } from 'electron'
import CreateProduct from './CreateProduct'
import { IProduct } from 'src/mainProcess/product/productModel'
import { LeanDocument } from 'mongoose'
import EditProduct from './EditProduct'
import DeleteProduct from './DeleteProduct'

const ListAllProducts: React.FC = () => {
  const [products, setProducts] = useState<LeanDocument<IProduct>[]>([])
  useEffect(() => {
    async function getProducts() {
      const allProducts = await ipc.invoke(`getAllProducts`) as LeanDocument<IProduct>[]
      setProducts(allProducts)
    }

    getProducts()
  }, [products])

  return (
    <Container justifyContent="center" alignItems="center">
      <CreateProduct />
      <Center>
        <Table variant="striped" size="lg" colorScheme="purple">
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
            {products.map(({ id, name, description, price }) => <Tr key={id}>
              <Td>{name}</Td>
              <Td>{description}</Td>
              <Td>R${price}</Td>
              <Td>
                <EditProduct id={id} name={name} description={description} price={price} />
              </Td>
              <Td>
                <DeleteProduct id={id} name={name} />
              </Td>
            </Tr>
            )}
          </Tbody>
        </Table>
      </Center>

    </Container>
  )
}

export default ListAllProducts
