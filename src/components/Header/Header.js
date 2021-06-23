import { useContext, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context.js';
import { setAuthToken } from '../../utils.js';
import { GiHamburgerMenu } from 'react-icons/gi';
import { CgClose } from 'react-icons/cg';
import { MEDIA_QUERY_MD } from '../../style/breakpoint';
import useRWD from '../../hooks/useRWD.js';
import NavList from '../NavList';
import { Container } from '../../style/commonLayout.js';

const Wrapper = styled.header`
  max-width: 960px;
  margin: 0 auto;
  /* min-height: calc(100vh - 132px); */
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
  padding: 1rem;
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

export default function Header() {
  const location = useLocation();
  const history = useHistory();
  const { setUser } = useContext(AuthContext);
  const [navToggle, setNavToggle] = useState(false);
  const device = useRWD();

  const handleLogout = () => {
    setAuthToken('');
    setUser(null);
    if (device !== 'PC') {
      setNavToggle((prevState) => !prevState);
    }
    if (location.pathname !== '/') {
      history.push('/');
    }
  };

  const handleNavDisplay = () => {
    if (device === 'PC') return;
    setNavToggle((prevState) => !prevState);
  };

  return (
    <Wrapper>
      <Heading>
        <Brand to='/' $active={location.pathname === '/'} children='My Blog' />
        {device !== 'PC' && (
          <IconWrapper>
            {navToggle ? (
              <CgClose onClick={handleNavDisplay} />
            ) : (
              <GiHamburgerMenu onClick={handleNavDisplay} />
            )}
          </IconWrapper>
        )}
      </Heading>
      {navToggle && (
        <NavList
          handleLogout={handleLogout}
          handleNavDisplay={handleNavDisplay}
          location={location}
        />
      )}

      {device === 'PC' && (
        <NavList
          handleLogout={handleLogout}
          handleNavDisplay={handleNavDisplay}
          location={location}
        />
      )}
    </Wrapper>
  );
}
