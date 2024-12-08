import React from "react";

const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">Details</h2>
          <button onClick={onClose} className="text-gray-600 text-xl hover:text-gray-800">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
