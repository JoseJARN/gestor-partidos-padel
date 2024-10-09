import React, { useEffect, useState } from 'react';

const SuccessModal = ({ isOpen, onClose }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full transform transition-all duration-300 ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'}`}>
        <h3 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">🎉 ¡Partido añadido con éxito!</h3>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          Recuerda que puedes descargar tus partidos en cualquier momento para hacer una copia de seguridad. 
          Encuentra el botón de descarga al final de la página.
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;