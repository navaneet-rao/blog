//
// src/components/Modal/Modal.tsx
// This component displays a modal dialog with a message and a close button.
// It is used to show success or error messages to the user.
// The modal is displayed on top of the main content and blocks interaction with it.
// 
// The component takes the following props:
// - isOpen: A boolean value indicating whether the modal is open.
// - onClose: A function to close the modal.
// - message: The message to display in the modal.
// - isSuccess: A boolean value indicating whether the message is a success message.
//


import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string; 
  isSuccess: boolean; 
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  message,
  isSuccess,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded bg-white p-6 shadow-lg">
        <div
          className={`text-lg font-semibold ${isSuccess ? "text-green-500" : "text-red-500"}`}
        >
          {message}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded bg-gray-300 px-4 py-2 font-medium text-gray-800 hover:bg-gray-400"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
