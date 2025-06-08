import { Info } from "lucide-react"
import { Modal, ModalContent } from "./ui/modal"

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  buttonText?: string
}

export function InfoModal({ isOpen, onClose, title, message, buttonText = "Got it" }: InfoModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent
        icon={<Info className="w-16 h-16 text-blue-500" />}
        title={title}
        message={message}
        buttonText={buttonText}
        onClose={onClose}
      />
    </Modal>
  )
} 