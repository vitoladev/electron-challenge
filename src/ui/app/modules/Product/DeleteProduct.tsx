import { useToast, IconButton, Modal, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, Button } from "@chakra-ui/react"
import { ipcRenderer as ipc } from "electron"
import { useState } from "react"
import { FaTrash } from "react-icons/fa"

const DeleteProduct = ({ id, name }: { id: string, name: string }) => {
  const [show, setShow] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const toast = useToast()

  const onSubmit = async (id: string) => {
    const response = await ipc.invoke(`deleteProduct`, id)
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
      <IconButton size="sm" onClick={handleShow} aria-label="Remover produto" icon={<FaTrash />} />
      <Modal
        isOpen={show}
        onClose={handleClose}>
        <ModalContent>
          <ModalHeader>Deletar {name}</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button onClick={() => onSubmit(id)} isLoading={isSubmitting} mr={3} colorScheme="teal">
                Deletar
            </Button>
            <Button onClick={handleClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteProduct
