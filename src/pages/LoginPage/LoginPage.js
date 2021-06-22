import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { login, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils.js';
import { AuthContext } from '../../context.js';
import {
  Container,
  LoginForm,
  TextInput,
  SubmitInput,
  ErrorMessage,
} from '../../style/commonLayout';

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
        <p>為方便 DEMO 密碼皆為預設值</p>
        <SubmitInput type='submit' value={'Login'} disabled={isDisabled} />
        {errMessage && <ErrorMessage children={errMessage} />}
      </LoginForm>
    </Container>
  );
}
