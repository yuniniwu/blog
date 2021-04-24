import styled from 'styled-components';
import GlobalStyle from '../../constants/style.js';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from '../../pages/HomePage';
import LoginPage from '../../pages/LoginPage';
import ArticlePage from '../../pages/ArticlePage';
import Header from '../Header';
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
      <Router>
        <>
          <GlobalStyle />
          <Container>
            <Header />

            {/* router */}
            <Switch>
              <Route path='/login'>
                <LoginPage />
              </Route>
              <Route path='/posts/:articleId'>
                <ArticlePage />
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
