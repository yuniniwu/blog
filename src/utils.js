const TOKEN_NAME = 'token';
const THEME = 'theme';

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const setThemeToLS = (value) => {
  window.localStorage.setItem(THEME, JSON.stringify(value));
};

export const getThemes = (key) => {
  const value = window.localStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }
};
