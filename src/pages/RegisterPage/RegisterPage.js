import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { register, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils.js';
import { AuthContext } from '../../context.js';
import {
  Container,
  LoginForm,
  TextInput,
  SubmitInput,
  ErrorMessage,
} from '../../style/commonLayout';

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
        <TextInput
          placeholder='nickname'
          value={nickname}
          onChange={handleNicknameChange}
          onFocus={handleInputFocus}
        />
        <TextInput
          placeholder='username'
          value={username}
          onChange={handleUserChange}
          onFocus={handleInputFocus}
        />
        <TextInput
          value='Lidemy'
          onChange={handlePasswordChange}
          onFocus={handleInputFocus}
          type='password'
        />
        <p>為方便 DEMO 密碼為預設值</p>

        <SubmitInput type='submit' value={'Register'} disabled={isDisabled} />
        {errMessage && <ErrorMessage children={errMessage} />}
      </LoginForm>
    </Container>
  );
}
