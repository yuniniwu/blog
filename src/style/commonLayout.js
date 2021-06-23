import styled from 'styled-components';
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from './breakpoint';

const Container = styled.div`
  max-width: 960px;
  min-height: calc(100vh - 132px);
  margin: 0 auto;
  position: relative;
`;

const LoginForm = styled.form`
  background-color: ${({ theme }) => theme.colors.darkwhite};
  padding: 4rem 2rem;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  p {
    margin: 0.5rem 0;
    color: ${({ theme }) => theme.colors.div.divText};
  }
`;

const PostForm = styled.form`
  background-color: ${({ theme }) => theme.colors.darkwhite};
  padding: 2rem;
`;

const TextInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.body};
  color: ${({ theme }) => theme.colors.text};

  & + & {
    margin-top: 1rem;
  }
`;

const AreaInput = styled.textarea`
  width: 100%;
  min-height: calc(100vh - 132px - 113px);
  margin: 1rem 0;
  box-sizing: border-box;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.body};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: 0px 0px 10px 5px ${({ theme }) => theme.colors.shadow} inset;

  ${MEDIA_QUERY_SM} {
    max-width: 100%;
  }
`;

const SubmitInput = styled.input`
  display: block;
  margin: 0 auto;
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.5rem 4rem;
  border: none;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.button.text};
  opacity: 0.6;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    opacity: 1;
  }

  ${(props) =>
    props.disabled === true &&
    `
    background: #ccc;
    color: #fff;
    cursor: none;
    transition: none;

    &:hover {
      transform: none;
    }

  `}
`;

const ErrorMessage = styled.div`
  margin-top: 1rem;
  font-weight: bold;
  color: red;
`;

export {
  Container,
  LoginForm,
  PostForm,
  TextInput,
  AreaInput,
  SubmitInput,
  ErrorMessage,
};
