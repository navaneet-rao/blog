// src/components/Modal/Modal.tsx
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
