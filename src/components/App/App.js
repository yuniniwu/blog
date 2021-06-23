import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../../style/globalStyle.js';
import { Reset } from 'styled-reset';
import * as themes from '../../style/theme/schema.json';
import { useTheme } from '../../style/theme/useTheme';
import { Container } from '../../style/commonLayout';
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
  ArticleListPage,
  LoginPage,
  RegisterPage,
  SingleArticlePage,
  AboutPage,
  NewPostPage,
  EditPage,
  AuthorArticlesPage,
} from '../../pages';

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
              <Reset />
              <GlobalStyle />
              {/* <Container style={{ fontFamily: themeMode.font }}> */}
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
                  <SingleArticlePage />
                </Route>
                <Route path='/new-post'>
                  <NewPostPage />
                </Route>
                <Route path='/edit-page/:articleId'>
                  <EditPage />
                </Route>
                <Route path='/articles'>
                  <ArticleListPage />
                </Route>
                <Route exact path='/'>
                  <HomePage />
                </Route>
              </Switch>
              <Footer />
              {/* </Container> */}
            </>
          </Router>
        </ThemeProvider>
      </AuthContext.Provider>
    )
  );
}
