const TOKEN_NAME = 'token';
const THEME = 'theme';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const setThemeToLS = (value) => {
  localStorage.setItem(THEME, JSON.stringify(value));
};

export const getThemes = () => {
  const value = localStorage.getItem(THEME);
  if (value) {
    return JSON.parse(value);
  }
};
