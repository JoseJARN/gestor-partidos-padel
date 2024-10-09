import React, { useState } from 'react';
import DeleteConfirmModal from './DeleteConfirmModal';
import EditMatchModal from './EditMatchModal';

const MatchList = ({ matches, updateMatch, deleteMatch }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleEdit = (index) => {
    setSelectedMatch(matches[index]);
    setSelectedIndex(index);
    setShowEditModal(true);
  };

  const handleDelete = (index) => {
    setSelectedIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    deleteMatch(selectedIndex);
    setShowDeleteModal(false);
  };

  const handleUpdate = (updatedMatch) => {
    updateMatch(selectedIndex, updatedMatch);
    setShowEditModal(false);
  };

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">📋 Lista de Partidos 🏆</h2>
      {matches.map((match, index) => (
        <div key={index} className={`border p-4 mb-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg ${match.won ? 'bg-green-50 border-green-500 dark:bg-green-900 dark:border-green-400' : 'bg-red-50 border-red-500 dark:bg-red-900 dark:border-red-400'}`}>
          <p><strong>👥 Compañero:</strong> {match.partner}</p>
          <p><strong>🏓 Rivales:</strong> {match.rivals}</p>
          <p><strong>🏅 Resultado:</strong> {match.result}</p>
          <p><strong>🏆 Ganado:</strong> {match.won ? 'Sí' : 'No'}</p>
          <p><strong>🏆 Categoría:</strong> {match.category}</p>
          <p><strong>🏟️ Tipo:</strong> {match.type}</p>
          <p><strong>🏢 Club:</strong> {match.club}</p>
          <p><strong>📍 Ubicación:</strong> {match.location}</p>
          <p><strong>📅 Fecha:</strong> {match.date}</p>
          <p><strong>💰 Costo:</strong> {match.cost}€</p>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={() => handleEdit(index)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300">
              ✏️ Editar
            </button>
            <button onClick={() => handleDelete(index)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors duration-300">
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ))}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
      <EditMatchModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        match={selectedMatch}
        onUpdate={handleUpdate}
      />
    </div>
  );
};

export default MatchList;