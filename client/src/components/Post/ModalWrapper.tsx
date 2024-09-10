import React from "react";
import Modal from "../Modal/Modal";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isSuccess: boolean;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  message,
  isSuccess,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    message={message}
    isSuccess={isSuccess}
  />
);

export default ModalWrapper;
