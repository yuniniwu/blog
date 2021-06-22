import styled from 'styled-components';

const Wrapper = styled.footer`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.p``;

const MyLink = styled.a`
  display: block;
  text-decoration: none;

  &:hover {
    color: blue;
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <Text>© 2021 Yuni Wu</Text>
      <MyLink href='https://github.com/yuniniwu/blog'>Source Code</MyLink>
    </Wrapper>
  );
}
