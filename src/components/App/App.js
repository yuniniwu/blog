import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../constants/globalStyle.js';
import * as themes from '../../constants/theme/schema.json';
import { useTheme } from '../../constants/theme/useTheme';
import WebFont from 'webfontloader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import MessageBoard from '../MessageBoard';
import { AuthContext, ThemeContext } from '../../context.js';
import { getMe } from '../../WebAPI';
import { getAuthToken, setThemeToLS, getThemes } from '../../utils';
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ArticlePage,
  AboutPage,
  NewPostPage,
  EditPage,
  AuthorArticlesPage,
} from '../../pages';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding-top: 64px;
  font-size: 1rem;
`;

export default function App() {
  const [user, setUser] = useState(null);
  const { theme, themeLoaded, themeSwitch, getFonts } = useTheme();
  const themeMode = theme === 'light' ? themes.data.light : themes.data.dark;

  // setThemeToLS(themes.default);
  // useEffect(() => {
  //   WebFont.load({
  //     google: {
  //       families: getFonts(themeMode),
  //     },
  //   });
  // }, []);

  useEffect(() => {
    if (!getAuthToken()) return;

    getMe().then((res) => {
      if (res.ok) {
        setUser(res.data);
      }
    });
  }, []);

  return (
    themeLoaded && (
      <AuthContext.Provider value={{ user, setUser }}>
        <ThemeProvider theme={themeMode}>
          <Router basename='/blog'>
            <>
              <GlobalStyle />
              <Container style={{ fontFamily: themeMode.font }}>
                <Header />
                {/* router */}
                <Switch>
                  <Route path='/author/:userId'>
                    <AuthorArticlesPage />
                  </Route>
                  <Route path='/message'>
                    <MessageBoard />
                  </Route>
                  <Route path='/about'>
                    <AboutPage />
                  </Route>
                  <Route path='/login'>
                    <LoginPage />
                  </Route>
                  <Route path='/register'>
                    <RegisterPage />
                  </Route>
                  <Route path='/posts/:articleId'>
                    <ArticlePage />
                  </Route>
                  <Route path='/new-post'>
                    <NewPostPage />
                  </Route>
                  <Route path='/edit-page/:articleId'>
                    <EditPage />
                  </Route>
                  <Route exact path='/'>
                    <HomePage />
                  </Route>
                </Switch>
                <Footer />
              </Container>
            </>
          </Router>
        </ThemeProvider>
      </AuthContext.Provider>
    )
  );
}
