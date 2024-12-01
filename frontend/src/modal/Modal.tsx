import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-[90%] md:w-full lg:w-full">
        <div className='w-full flex justify-end items-end mb-2 -mt-2'>

        <button
          onClick={onClose}
          className=" border hover:border-red-500 py-1 px-2 rounded-full text-gray-600 hover:text-red-500 text-xs"
        >
          ✕
        </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
