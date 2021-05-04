import styled from 'styled-components';
import GlobalStyle from '../../constants/style.js';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';
import ArticlePage from '../../pages/ArticlePage';
import AboutPage from '../../pages/AboutPage';
import NewPostPage from '../../pages/NewPostPage';
import EditPage from '../../pages/EditPage';
import Header from '../Header';
import MessageBoard from '../MessageBoard';
import { AuthContext } from '../../context.js';
import { getMe } from '../../WebAPI';
import { getAuthToken } from '../../utils';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding-top: 64px;
  font-size: 1rem;
`;

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (getAuthToken())
      getMe().then((res) => {
        if (res.ok) {
          setUser(res.data);
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router basename='/blog'>
        <>
          <GlobalStyle />
          <Container>
            <Header />

            {/* router */}
            <Switch>
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
          </Container>
        </>
      </Router>
    </AuthContext.Provider>
  );
}
