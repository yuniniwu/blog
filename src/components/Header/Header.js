import { useContext } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context.js';
import { setAuthToken } from '../../utils.js';

const Wrapper = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  box-shadow: 0px 4px 8px #555;
  padding: 0 2rem;
  font-size: 1.2rem;
  box-sizing: border-box;
  background: #fff;
  color: #555;
`;

const LeftContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Brand = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 2rem;
  margin-right: 1rem;
`;

const NavList = styled.nav`
  display: flex;
  align-items: center;
  height: 64px;
`;

const NavItem = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 64px;
  cursor: pointer;
  color: black;
  text-decoration: none;

  &:hover {
    background-color: blue;
  }

  ${(props) =>
    props.$active &&
    `
    background: rgba(0,0,0,0.15)
  `}
`;

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  return (
    <Wrapper>
      <LeftContainer>
        <Brand to='/' $active={location.pathname === '/'}>
          My Blog
        </Brand>
        <NavList>
          <NavItem
            to='/'
            $active={location.pathname === '/'}
            children='Posts'
          />
          {user && (
            <>
              <NavItem
                to='/new-post'
                $active={location.pathname === '/new-post'}
                children='New Post'
              />
              <NavItem
                to='/about'
                $active={location.pathname === '/about'}
                children='About'
              />
            </>
          )}
          <NavItem
            to='/message'
            $active={location.pathname === '/message'}
            children='Message Board'
          />
        </NavList>
      </LeftContainer>
      <NavList>
        {!user && (
          <>
            <NavItem to='/login' $active={location.pathname === '/login'}>
              Login
            </NavItem>
            <NavItem to='/register' $active={location.pathname === '/register'}>
              Register
            </NavItem>
          </>
        )}
        {user && <NavItem onClick={handleLogout}>Logout</NavItem>}
      </NavList>
    </Wrapper>
  );
}
