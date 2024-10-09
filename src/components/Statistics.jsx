import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { subDays, subMonths, subYears, isAfter } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const Statistics = ({ matches }) => {
  const getStats = (period) => {
    let startDate;
    const now = new Date();

    switch (period) {
      case 'week':
        startDate = subDays(now, 7);
        break;
      case 'month':
        startDate = subMonths(now, 1);
        break;
      case 'year':
        startDate = subYears(now, 1);
        break;
      default:
        startDate = new Date(0); // Beginning of time
    }

    const filteredMatches = matches.filter(match => isAfter(new Date(match.date), startDate));
    const won = filteredMatches.filter(match => match.won).length;
    const lost = filteredMatches.length - won;
    const winPercentage = filteredMatches.length > 0 ? (won / filteredMatches.length * 100).toFixed(2) : 0;
    const totalSpent = filteredMatches.reduce((sum, match) => sum + Number(match.cost), 0);

    return { won, lost, total: filteredMatches.length, winPercentage, totalSpent };
  };

  const weekStats = getStats('week');
  const monthStats = getStats('month');
  const yearStats = getStats('year');
  const allTimeStats = getStats('all');

  const categoryStats = matches.reduce((acc, match) => {
    acc[match.category] = (acc[match.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = {
    labels: Object.keys(categoryStats),
    datasets: [
      {
        data: Object.values(categoryStats),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  const barData = {
    labels: ['Última semana', 'Último mes', 'Último año', 'Total'],
    datasets: [
      {
        label: 'Partidos ganados',
        data: [weekStats.won, monthStats.won, yearStats.won, allTimeStats.won],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Partidos perdidos',
        data: [weekStats.lost, monthStats.lost, yearStats.lost, allTimeStats.lost],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
    ]
  };

  const StatsTable = ({ title, stats }) => (
    <div className="mb-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <div className="overflow-hidden rounded-lg shadow">
        <table className="w-full">
          <tbody>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <td className="px-4 py-2 font-semibold">🏆 Ganados:</td>
              <td className="px-4 py-2">{stats.won}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">😓 Perdidos:</td>
              <td className="px-4 py-2">{stats.lost}</td>
            </tr>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <td className="px-4 py-2 font-semibold">🎾 Total:</td>
              <td className="px-4 py-2">{stats.total}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold">📊 % Victorias:</td>
              <td className="px-4 py-2">{stats.winPercentage}%</td>
            </tr>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <td className="px-4 py-2 font-semibold">💰 Gastado:</td>
              <td className="px-4 py-2">{stats.totalSpent}€</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">📊 Estadísticas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatsTable title="🗓️ Última semana" stats={weekStats} />
        <StatsTable title="📅 Último mes" stats={monthStats} />
        <StatsTable title="🗓️ Último año" stats={yearStats} />
        <StatsTable title="🏆 Total" stats={allTimeStats} />
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">🏅 Partidos por categoría</h3>
        <div style={{ height: '300px' }}>
          <Pie data={pieData} options={{ maintainAspectRatio: false }} />
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">📈 Resumen de partidos</h3>
        <div style={{ height: '300px' }}>
          <Bar 
            data={barData} 
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Número de partidos'
                  }
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default Statistics;