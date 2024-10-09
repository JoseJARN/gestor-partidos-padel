import React, { useState, useEffect } from 'react';

const EditMatchModal = ({ isOpen, onClose, match, onUpdate }) => {
  const [editedMatch, setEditedMatch] = useState({
    partner: '',
    rivals: '',
    result: '',
    won: false,
    category: '1era',
    type: 'Amistoso',
    club: '',
    location: '',
    date: '',
    cost: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (match) {
      setEditedMatch({
        ...match,
        cost: match.cost.toString(), // Ensure cost is a string for the input
      });
    }
  }, [match]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedMatch(prevMatch => ({
      ...prevMatch,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editedMatch.partner.trim()) newErrors.partner = "El compañero es requerido";
    if (!editedMatch.rivals.trim()) newErrors.rivals = "Los rivales son requeridos";
    if (!editedMatch.result.trim()) newErrors.result = "El resultado es requerido";
    if (!editedMatch.date) newErrors.date = "La fecha es requerida";
    if (!editedMatch.cost.trim()) newErrors.cost = "El costo es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdate({
        ...editedMatch,
        cost: parseFloat(editedMatch.cost), // Convert cost back to a number
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full m-4">
        <h3 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">✏️ Editar Partido</h3>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Compañero:</label>
              <input
                type="text"
                name="partner"
                value={editedMatch.partner}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.partner && <p className="text-red-500 text-sm">{errors.partner}</p>}
            </div>
            <div>
              <label className="block mb-2">Rivales:</label>
              <input
                type="text"
                name="rivals"
                value={editedMatch.rivals}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.rivals && <p className="text-red-500 text-sm">{errors.rivals}</p>}
            </div>
            <div>
              <label className="block mb-2">Resultado:</label>
              <input
                type="text"
                name="result"
                value={editedMatch.result}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.result && <p className="text-red-500 text-sm">{errors.result}</p>}
            </div>
            <div>
              <label className="block mb-2">
                <input
                  type="checkbox"
                  name="won"
                  checked={editedMatch.won}
                  onChange={handleChange}
                />
                {' '}Partido ganado
              </label>
            </div>
            <div>
              <label className="block mb-2">Categoría:</label>
              <select
                name="category"
                value={editedMatch.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="1era">1era</option>
                <option value="2da">2da</option>
                <option value="3era">3era</option>
                <option value="4ta">4ta</option>
                <option value="5ta">5ta</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Tipo:</label>
              <select
                name="type"
                value={editedMatch.type}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="Amistoso">Amistoso</option>
                <option value="Liga">Liga</option>
                <option value="Torneo">Torneo</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Club:</label>
              <input
                type="text"
                name="club"
                value={editedMatch.club}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Ubicación:</label>
              <input
                type="text"
                name="location"
                value={editedMatch.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">Fecha:</label>
              <input
                type="date"
                name="date"
                value={editedMatch.date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
            </div>
            <div>
              <label className="block mb-2">Costo:</label>
              <input
                type="number"
                name="cost"
                value={editedMatch.cost}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              {errors.cost && <p className="text-red-500 text-sm">{errors.cost}</p>}
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditMatchModal;