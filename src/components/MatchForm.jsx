import React, { useState } from 'react';
import SuccessModal from './SuccessModal';

const MatchForm = ({ addMatch }) => {
  const [match, setMatch] = useState({
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
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMatch(prevMatch => ({
      ...prevMatch,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!match.partner.trim()) newErrors.partner = "El compañero es requerido";
    if (!match.rivals.trim()) newErrors.rivals = "Los rivales son requeridos";
    if (!match.result.trim()) newErrors.result = "El resultado es requerido";
    if (!match.date) newErrors.date = "La fecha es requerida";
    if (!match.cost.trim()) newErrors.cost = "El costo es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      addMatch({
        ...match,
        cost: parseFloat(match.cost), // Convert cost to a number
      });
      setMatch({
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
      setShowModal(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">Añadir Partido</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">👥 Compañero:</label>
            <input
              type="text"
              name="partner"
              value={match.partner}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            />
            {errors.partner && <p className="text-red-500 text-sm mt-1">{errors.partner}</p>}
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">🏓 Rivales:</label>
            <input
              type="text"
              name="rivals"
              value={match.rivals}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            />
            {errors.rivals && <p className="text-red-500 text-sm mt-1">{errors.rivals}</p>}
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">🏅 Resultado:</label>
            <input
              type="text"
              name="result"
              value={match.result}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            />
            {errors.result && <p className="text-red-500 text-sm mt-1">{errors.result}</p>}
          </div>
          <div className="flex items-center">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="won"
                checked={match.won}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-blue-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">🏆 Partido ganado</span>
            </label>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">🏆 Categoría:</label>
            <select
              name="category"
              value={match.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            >
              <option value="1era">1era</option>
              <option value="2da">2da</option>
              <option value="3era">3era</option>
              <option value="4ta">4ta</option>
              <option value="5ta">5ta</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">🏟️ Tipo:</label>
            <select
              name="type"
              value={match.type}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            >
              <option value="Amistoso">Amistoso</option>
              <option value="Liga">Liga</option>
              <option value="Torneo">Torneo</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">🏢 Club:</label>
            <input
              type="text"
              name="club"
              value={match.club}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">📍 Ubicación:</label>
            <input
              type="text"
              name="location"
              value={match.location}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">📅 Fecha:</label>
            <input
              type="date"
              name="date"
              value={match.date}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-300">💰 Costo:</label>
            <input
              type="number"
              name="cost"
              value={match.cost}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-gray-800"
            />
            {errors.cost && <p className="text-red-500 text-sm mt-1">{errors.cost}</p>}
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-md transition-colors duration-300"
          >
            Añadir Partido
          </button>
        </div>
      </form>
      <SuccessModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default MatchForm;