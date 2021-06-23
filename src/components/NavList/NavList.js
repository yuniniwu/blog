import { useContext } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context.js';
import { MEDIA_QUERY_MD } from '../../style/breakpoint';
import PropTypes from 'prop-types';

const NavListWrapper = styled.nav`
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
  display: block;
  align-self: stretch;
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  padding: 1rem;
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

export default function NavList({ handleLogout, handleNavDisplay, location }) {
  const { user } = useContext(AuthContext);

  return (
    <NavListWrapper>
      <NavItem
        to='/articles'
        $active={location.pathname === '/articles'}
        children='All Posts'
        onClick={handleNavDisplay}
      />
      <NavItem
        to='/message'
        $active={location.pathname === '/message'}
        children='Message Board'
        onClick={handleNavDisplay}
      />
      {user ? (
        <>
          <NavItem
            to='/new-post'
            $active={location.pathname === '/new-post'}
            children='Write a story'
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
    </NavListWrapper>
  );
}

NavList.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  handleNavDisplay: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
