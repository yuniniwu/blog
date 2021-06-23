import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context.js';
import { Container } from '../../style/commonLayout.js';
import { MEDIA_QUERY_SM } from '../../style/breakpoint';

const Title = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
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
  width: 50%;
  font-size: 2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};

  ${MEDIA_QUERY_SM} {
    width: 100%;
    padding: 1rem;
  }
`;

const Content = styled.p`
  width: 50%;
  white-space: pre-wrap;

  ${MEDIA_QUERY_SM} {
    width: 100%;
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
            <Quote>Either I will find a way, or I will make one.</Quote>
            <Content>
              Lorem ipsum dolor sit amet, cum mandamus euripidis ne. Enim
              iracundia efficiendi ad vel. Et democritum repudiandae
              definitiones eam. Duo autem dolore tritani id, vim error
              reprehendunt at. Nec case eloquentiam referrentur id. At cum
              ridens mentitum comprehensam, adhuc homero vim an, consul mentitum
              concludaturque eu mel. Reque movet no vim, id dicam oblique duo.
              Duo veniam oporteat ne, utinam ridens forensibus sit at. Est ea
              verterem delicatissimi, case aliquam vix ei. Ad scripta impedit
              oporteat vix. Vix elitr audiam singulis cu. Ius causae molestie
              deserunt ea, cum ex meis integre scripserit. Blandit dissentiet
              eam cu, ius id erat corpora, sea cu volumus imperdiet
              definitionem. Et vidit debitis mea, vix quod menandri adversarium
              ad.
            </Content>
          </UserInfo>
        </>
      )}
    </Container>
  );
}
