import { XCircle } from "lucide-react"
import { Modal, ModalContent } from "./ui/modal"

interface ErrorModalProps {
  isOpen: boolean
  onClose: () => void
  message?: string
}

export function ErrorModal({ isOpen, onClose, message = "Something went wrong. Please try again." }: ErrorModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        icon={<XCircle className="w-16 h-16 text-red-500" />}
        title="Error"
        message={message}
        buttonText="Try Again"
        onClose={onClose}
      />
    </Modal>
  )
} 