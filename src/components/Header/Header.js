import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context.js';
import { setAuthToken } from '../../utils.js';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import { MEDIA_QUERY_MD } from '../../style/breakpoint';
import useRWD from '../../hooks/useRWD.js';

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
  }
`;

const Heading = styled.nav`
  width: 100vw;
  display: flex;
  justify-content: space-between;
`;

const Brand = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 2rem;
  display: border-box;
  padding: 0.5rem;
`;

const IconWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.body};
  font-size: 1.5rem;
  padding: 0.4rem 0.5rem;
  border-radius: 10px;
  align-self: center;
  margin-right: 0.5rem;
`;

// const LeftContainer = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
// `;

const NavList = styled.nav`
  width: 100%;
  display: flex;
  align-items: flex-end;
  transition: 0.3s;

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    background-color: ${({ theme }) => theme.colors.div};
    color: ${({ theme }) => theme.colors.text};
  }
`;

const NavItem = styled(Link)`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  align-self: stretch;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  padding: 10px;
  transition: ease-out;
  font-weight: bolder;
  transition: 0.3s;

  &:hover {
    box-shadow: inset 0 -8px ${({ theme }) => theme.colors.link.text};
  }

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.darkwhite};
  }
`;

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const { user, setUser } = useContext(AuthContext);
  const [navToggle, setNavToggle] = useState('false');
  const device = useRWD();

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if (location.pathname !== '/') {
      history.push('/');
    }
    setNavToggle((prevState) => !prevState);
  };

  const handleNavDisplay = () => {
    setNavToggle((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <Heading>
        <Brand to='/' $active={location.pathname === '/'} children='My Blog' />
        {device !== 'PC' && (
          <IconWrapper>
            {navToggle ? (
              <GiHamburgerMenu onClick={handleNavDisplay} />
            ) : (
              <CgClose onClick={handleNavDisplay} />
            )}
          </IconWrapper>
        )}

        {console.log('navToggle', navToggle)}
      </Heading>

      {navToggle && (
        <NavList>
          {console.log('navToggle', navToggle)}
          <NavItem
            to='/'
            $active={location.pathname === '/'}
            children='Posts'
            onClick={handleNavDisplay}
          />
          <NavItem
            to='/message'
            $active={location.pathname === '/message'}
            children='Message Board'
          />
          {user ? (
            <>
              <NavItem
                to='/new-post'
                $active={location.pathname === '/new-post'}
                children='New Post'
                onClick={handleNavDisplay}
              />
              <NavItem
                to='/about'
                $active={location.pathname === '/about'}
                children='About'
                onClick={handleNavDisplay}
              />
              <NavItem to='/' onClick={handleLogout}>
                Logout
              </NavItem>
            </>
          ) : (
            <>
              <NavItem
                to='/login'
                $active={location.pathname === '/login'}
                children='Login'
                onClick={handleNavDisplay}
              />
              <NavItem
                to='/register'
                $active={location.pathname === '/register'}
                children='Register'
                onClick={handleNavDisplay}
              />
            </>
          )}
        </NavList>
      )}
    </Wrapper>
  );
}
