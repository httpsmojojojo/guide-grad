import { CheckCircle } from "lucide-react"
import { Modal, ModalContent } from "./ui/modal"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  message?: string
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  title = "Thank You!", 
  message = "We will contact you as soon as possible to confirm your consultation." 
}: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        icon={<CheckCircle className="w-16 h-16 text-green-500" />}
        title={title}
        message={message}
        onClose={onClose}
      />
    </Modal>
  )
} 