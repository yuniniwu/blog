import { useState, useContext, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { getArticle, editPost } from '../../WebAPI';
import { AuthContext } from '../../context.js';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1.2rem;
`;

const PostForm = styled.form``;

const TitleInput = styled.input`
  width: 70%;
  margin: 0 0 1rem 1rem;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

const BodyInput = styled.textarea`
  width: 90%;
  height: 300px;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const SubmitInput = styled.input`
  display: block;
  text-decoration: none;
  background: #6699cc;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
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
          文章標題
          <TitleInput
            value={title}
            onChange={handleTitleChange}
            onFocus={handleInputFocus}
          />
          <BodyInput
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
