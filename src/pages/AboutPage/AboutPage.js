import styled from 'styled-components';
import { useContext } from 'react';
import { AuthContext } from '../../context.js';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  padding-left: 2rem;
  border-bottom: 2px solid #ccc;
  margin-bottom: 1rem;
`;

const Author = styled.p`
  padding-left: 2rem;

  span {
    color: blue;
    font-weight: bold;
  }
`;

const UserInfo = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Quote = styled.p`
  width: 50%;
  font-size: 2rem;
  font-weight: bold;
  color: #555;
`;

const Content = styled.p`
  width: 50%;
  white-space: pre-wrap;
`;

export default function AboutPage() {
  const { user } = useContext(AuthContext);
  return (
    <Container>
      {!user && alert('請先登入')}
      {user && (
        <>
          <Title>About</Title>
          <Author>
            Hi, I am <span>{user.username}</span>
          </Author>
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
