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
  display: inline-block;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    color: ${({ theme }) => theme.colors.msg.text};
  }
`;

export default function Footer() {
  return (
    <Wrapper>
      <Text>© 2021 Yuni Wu</Text>
      <MyLink href='https://github.com/yuniniwu/blog'>Source Code</MyLink>
      <MyLink href='https://www.manypixels.co/gallery'>illustration ©</MyLink>
    </Wrapper>
  );
}
