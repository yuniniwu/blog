import { useEffect, useState } from 'react';
import { setThemeToLS, getThemes } from '../../utils';
import _ from 'lodash';

export const useTheme = () => {
  // const localTheme = getThemes('theme');
  const [theme, setTheme] = useState('light');
  const [themeLoaded, setThemeLoaded] = useState(false);

  const setMode = (mode) => {
    setThemeToLS(mode);
    setTheme(mode);
  };

  const getFonts = (themeData) => {
    const allFonts = _.values(_.mapValues(themeData, 'font'));
    return allFonts;
  };

  const themeSwitch = () => {
    theme === 'light' ? setMode('dark') : setMode('light');
  };

  useEffect(() => {
    getThemes() && setTheme(getThemes());
    setThemeLoaded(true);
  }, []);

  return { theme, themeLoaded, themeSwitch, getFonts };
};
