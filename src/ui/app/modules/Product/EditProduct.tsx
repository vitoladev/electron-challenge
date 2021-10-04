import { Button, FormControl, FormErrorMessage, FormLabel, useToast, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, Textarea } from "@chakra-ui/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { UpdateProductSchema, updateProductSchema } from "src/mainProcess/product/schemas"
import { FaRegEdit } from "react-icons/fa"
import { useState } from "react"
import { ipcRenderer as ipc } from "electron"

const EditProduct = ({ id, name, description, price }: UpdateProductSchema) => {
  const [show, setShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm<UpdateProductSchema>({
    mode: `onBlur`,
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      id,
      name,
      description,
      price
    }
  })

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    const response = await ipc.invoke(`updateProduct`, data)
    if (response.success) {
      toast({
        title: response.success,
        status: `success`,
      })
      setIsSubmitting(false)
      handleClose()
    } else if (response.error) {
      toast({
        title: response.success,
        status: `error`,
      })
    }
  }
    
  return (
    <>
      <IconButton onClick={handleShow} size="sm" aria-label="Editar produto" icon={<FaRegEdit />} />
      <Modal
        isOpen={show}
        onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Editar {name}</ModalHeader>
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
                Editar
              </Button>
              <Button onClick={handleClose}>Cancelar</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditProduct
