import React, { useState, useEffect } from 'react';
import MatchForm from './components/MatchForm';
import MatchList from './components/MatchList';
import Statistics from './components/Statistics';
import { saveMatches, loadMatches, loadTheme, saveTheme } from './utils/storage';

function App() {
  const [matches, setMatches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMatches = loadMatches();
    if (savedMatches) {
      setMatches(savedMatches);
    }
    const savedTheme = loadTheme();
    setDarkMode(savedTheme === 'dark');
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    saveTheme(!darkMode ? 'dark' : 'light');
  };

  const addMatch = (match) => {
    const updatedMatches = [...matches, match];
    setMatches(updatedMatches);
    saveMatches(updatedMatches);
  };

  const updateMatch = (index, updatedMatch) => {
    const updatedMatches = [...matches];
    updatedMatches[index] = updatedMatch;
    setMatches(updatedMatches);
    saveMatches(updatedMatches);
  };

  const deleteMatch = (index) => {
    const updatedMatches = matches.filter((_, i) => i !== index);
    setMatches(updatedMatches);
    saveMatches(updatedMatches);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto p-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">🎾 Gestor de Partidos de Pádel</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <MatchForm addMatch={addMatch} />
        <MatchList matches={matches} updateMatch={updateMatch} deleteMatch={deleteMatch} />
        <Statistics matches={matches} />
      </div>
    </div>
  );
}

export default App;