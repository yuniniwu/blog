import { useState, useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils.js';
import { AuthContext } from '../../context.js';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
`;

const LoginForm = styled.form``;

const TextInput = styled.input`
  margin: 0 0 1rem 1rem;
  padding: 0.5rem;
`;

const SubmitInput = styled.input`
  text-decoration: none;
  background: #6699cc;
  color: white;
  padding: 0.5rem 1rem;
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

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();
  // disabled submit button or not
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    login(username, password).then((data) => {
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
    setUsername('');
    setPassword('');
    setIsDisabled(false);
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
          帳號:
          <TextInput
            value={username}
            onChange={handleUserChange}
            onFocus={handleInputFocus}
          />
        </div>
        <div>
          密碼
          <TextInput
            value={password}
            onChange={handlePasswordChange}
            onFocus={handleInputFocus}
            type='password'
          />
        </div>

        <SubmitInput type='submit' value={'送出'} disabled={isDisabled} />
        {errMessage && <ErrorMessage>{errMessage}</ErrorMessage>}
      </LoginForm>
    </Container>
  );
}
