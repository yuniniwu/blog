import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { newPost } from '../../WebAPI';
import { AuthContext } from '../../context.js';
import {
  Container,
  PostForm,
  TextInput,
  AreaInput,
  SubmitInput,
  ErrorMessage,
} from '../../style/commonLayout';

export default function NewPostPage() {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();
  // disabled submit button or not
  const [isDisabled, setIsDisabled] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !body) {
      return setErrMessage('標題或內文不得為空');
    }
    newPost(title, body).then((data) => {
      if (!data.ok) {
        history.push('/');
        alert('新增文章成功');
      } else {
        setIsDisabled(true);
        alert('新增文章失敗');
        return setErrMessage(data.message);
      }
    });

    setTitle('');
    setBody('');
    setIsDisabled(false);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleInputFocus = () => {
    setErrMessage('');
    setIsDisabled(false);
  };

  return (
    <Container>
      {user && (
        <PostForm onSubmit={handleSubmit}>
          <TextInput
            placeholder='title'
            value={title}
            onChange={handleTitleChange}
            onFocus={handleInputFocus}
          />
          <AreaInput
            placeholder='Write something'
            value={body}
            onChange={handleBodyChange}
            onFocus={handleInputFocus}
          />
          <SubmitInput type='submit' value={'新增文章'} disabled={isDisabled} />
          {errMessage && <ErrorMessage>{errMessage}</ErrorMessage>}
        </PostForm>
      )}
    </Container>
  );
}
