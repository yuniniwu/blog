import { useState, useContext } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { register, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils.js';
import { AuthContext } from '../../context.js';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px;
`;

const LoginForm = styled.form`
  font-size: 1.2rem;
`;

const TextInput = styled.input`
  margin: 0 0 1rem 1rem;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const SubmitInput = styled.input`
  text-decoration: none;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  background: #555;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.2);
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

export default function RegisterPage() {
  const { setUser } = useContext(AuthContext);
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();
  // disabled submit button or not
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, password, nickname).then((data) => {
      if (data.ok === 0) {
        setIsDisabled(true);
        return setErrMessage(data.message);
      }
      setAuthToken(data.token);

      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          setIsDisabled(true);
          return setErrMessage(response.message);
        }
        setUser(response.data);
        history.push('/');
      });
    });
    setNickname('');
    setUsername('');
    setPassword('');
    setIsDisabled(false);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleUserChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleInputFocus = () => {
    setErrMessage('');
    setIsDisabled(false);
  };

  return (
    <Container>
      <LoginForm onSubmit={handleSubmit}>
        <div>
          暱稱：
          <TextInput
            value={nickname}
            onChange={handleNicknameChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          帳號：
          <TextInput
            value={username}
            onChange={handleUserChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          密碼：
          <TextInput
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleInputFocus}
            type='password'
          />
        </div>

        <SubmitInput type='submit' value={'註冊'} disabled={isDisabled} />
        {errMessage && <ErrorMessage>{errMessage}</ErrorMessage>}
      </LoginForm>
    </Container>
  );
}
