export const saveMatches = (matches) => {
  localStorage.setItem('padel_matches', JSON.stringify(matches));
};

export const loadMatches = () => {
  const matches = localStorage.getItem('padel_matches');
  return matches ? JSON.parse(matches) : [];
};

export const saveTheme = (theme) => {
  localStorage.setItem('theme', theme);
};

export const loadTheme = () => {
  return localStorage.getItem('theme') || 'light';
};