import { useState, useContext, useEffect, useLayoutEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getArticle, editPost } from '../../WebAPI';
import { AuthContext } from '../../context.js';
import {
  Container,
  PostForm,
  TextInput,
  AreaInput,
  SubmitInput,
  ErrorMessage,
} from '../../style/commonLayout';

export default function EditPage() {
  const { articleId } = useParams();
  const { user } = useContext(AuthContext);
  const [article, setArticle] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();
  // disabled submit button or not
  const [isDisabled, setIsDisabled] = useState(false);

  useLayoutEffect(() => {
    getArticle(articleId).then((data) => {
      setArticle(data);
    });
  }, [articleId]);

  useEffect(() => {
    setTitle(article.title);
    setBody(article.body);
  }, [article]);

  const handleSubmit = (e) => {
    e.preventDefault();

    editPost(articleId, title, body).then((data) => {
      if (data.ok === 0) {
        setIsDisabled(true);
        return setErrMessage(data.message);
      }
      history.push(`/posts/${articleId}`);
      alert('編輯成功');
    });
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
            value={title}
            onChange={handleTitleChange}
            onFocus={handleInputFocus}
          />
          <AreaInput
            value={body}
            onChange={handleBodyChange}
            onFocus={handleInputFocus}
          />
          <SubmitInput type='submit' value={'編輯完成'} disabled={isDisabled} />
          {errMessage && <ErrorMessage>{errMessage}</ErrorMessage>}
        </PostForm>
      )}
    </Container>
  );
}
