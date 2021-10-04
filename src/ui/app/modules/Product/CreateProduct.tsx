import { Button, useToast, HStack, FormControl, Textarea, FormErrorMessage, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { IoMdAddCircle } from "react-icons/io"
import { productSchema, ProductSchema } from "../../../../mainProcess/product/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { ipcRenderer as ipc } from 'electron'

const CreateProduct: React.FC = () => {
  const [show, setShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm<ProductSchema>({
    mode: `onBlur`,
    resolver: zodResolver(productSchema),
  })

  const onSubmit = async (data: ProductSchema) => {
    setIsSubmitting(true)
    const response = await ipc.invoke(`createProduct`, data)
    if (response.success) {
      toast({
        title: response.success,
        status: `success`,
      })
      setIsSubmitting(false)
      handleClose()
    } else if (response.error) {
      toast({
        title: response.error,
        status: `error`,
      })
    }

  }

  return (
    <>
      <HStack justifyContent="left" justifyItems="left">
        <IconButton mt={4} size="lg" onClick={handleShow} aria-label="Adicionar produto" icon={<IoMdAddCircle />} />
      </HStack>
      <Modal
        isOpen={show}
        onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Criar produto</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.name ? true : false}>
                <FormLabel>Nome</FormLabel>
                <Input {...register(`name`)} />
                <FormErrorMessage>{errors.name && errors.name?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.description?.message ? true : false}>
                <FormLabel>Descrição</FormLabel>
                <Textarea {...register(`description`)} />
                <FormErrorMessage>{errors.description && errors.description?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.price?.message && errors.price.type !== `invalid_type`  ? true : false}>
                <FormLabel>Preço</FormLabel>
                <Input {...register(`price`)} onBlur={() => setValue(`price`, Number(getValues(`price`)))} type="number" min="1" />
                <FormErrorMessage>{errors.price && errors.price.type !== `invalid_type` && errors.price?.message}</FormErrorMessage>
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button mr={3} colorScheme="teal" isLoading={isSubmitting} type="submit">
                Criar
              </Button>
              <Button onClick={handleClose}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateProduct
