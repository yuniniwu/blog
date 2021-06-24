import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context.js';
import { Container } from '../../style/commonLayout.js';
import { MEDIA_QUERY_SM } from '../../style/breakpoint';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { ReactComponent as AboutImg } from '../../image/AboutImg.svg';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  & svg {
    max-width: 100%;
    height: auto;
  }

  ${MEDIA_QUERY_SM} {
    width: 100%;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 1rem auto;
  text-align: center;

  ${MEDIA_QUERY_SM} {
    font-size: 2rem;
  }
`;

const Author = styled(Link)`
  text-decoration: none;
  margin-left: 1rem;
  &:hover {
    box-shadow: 0px -5px 0px 0px ${({ theme }) => theme.colors.button.dangerBg} inset;
  }
`;

const UserInfo = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
  }
`;

const Quote = styled.p`
  max-width: 80%;
  width: calc(100vw - 2rem);
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin: 1rem auto;

  & span {
    padding: 1rem;
  }
`;

export default function AboutPage() {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      {!user && alert('請先登入')}
      {user && (
        <>
          <Title>
            About
            <Author>{user.username}</Author>
          </Title>
          <UserInfo>
            <Quote>
              <FaQuoteLeft />
              <span>Either I will find a way, or I will make one.</span>
              <FaQuoteRight />
            </Quote>
          </UserInfo>
          <ImageWrapper>
            <AboutImg />
          </ImageWrapper>
        </>
      )}
    </Container>
  );
}
