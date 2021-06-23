import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getArticle, deletePost } from '../../WebAPI';
import { useEffect, useState } from 'react';
import { MEDIA_QUERY_MD, MEDIA_QUERY_SM } from '../../style/breakpoint';

const ArticleContainer = styled.div`
  padding: 3rem;

  ${MEDIA_QUERY_SM} {
    padding: 1rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5rem;
  line-height: 1.8rem;
  font-weight: bold;

  /* 小於 768 */
  ${MEDIA_QUERY_SM} {
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  clear: both;
`;

const ArticleInfo = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;

  ${MEDIA_QUERY_SM} {
    flex-direction: column;
`;

const Author = styled(Link)`
  text-decoration: none;
  margin-bottom: 0.5rem;
  &:hover {
    box-shadow: 0px -5px 0px 0px ${({ theme }) => theme.colors.button.dangerBg} inset;
  }
`;
const ArticleTime = styled.p`
  color: ${({ theme }) => theme.colors.placeholder};
`;

const ArticleBody = styled.p`
  white-space: pre-wrap;
  font-size: 1.2rem;
  line-height: 1.8rem;
  padding: 2rem;

  ${MEDIA_QUERY_SM} {
    line-height: 1.5rem;
    padding: 1rem;
  }
`;

const EditArticleButton = styled(Link)`
  font-weight: bold;
  display: inline-block;
  background-color: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.button.text};
  box-shadow: 0px 0px 8px 5px ${({ theme }) => theme.colors.shadow};
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  margin: 0 1rem 1rem 0;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  float: right;

  &:hover {
    transform: scale(1.2);
  }
`;

const DeleteArticleButton = styled(EditArticleButton)`
  background-color: ${({ theme }) => theme.colors.button.dangerBg};
  color: ${({ theme }) => theme.colors.button.dangerText};
  border: 0;
`;

export default function OneArticle({ id, user }) {
  const [article, setArticle] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    getArticle(id).then((data) => {
      setArticle(data);
      setAuthor(data.user.nickname);
    });
  }, [id]);

  useEffect(() => {
    user && user.id === article.userId && setIsEdit(true);
  }, [user, article.userId]);

  const handleArticleDelete = () => {
    deletePost(id).then(alert('刪除成功'));
  };

  return (
    <ArticleContainer>
      {isEdit && (
        <>
          <EditArticleButton to={`/edit-page/${id}`} children='Edit' />
          <DeleteArticleButton
            to={`/`}
            onClick={handleArticleDelete}
            children='Delete'
          />
        </>
      )}
      <Title>{article.title}</Title>
      <ArticleInfo>
        <Author to={`/author/${article.userId}`}>作者：{author}</Author>
        <ArticleTime>
          {new Date(article.createdAt).toLocaleString()}
        </ArticleTime>
      </ArticleInfo>
      <ArticleBody>{article.body}</ArticleBody>
    </ArticleContainer>
  );
}

OneArticle.propTypes = {
  id: PropTypes.string,
  user: PropTypes.object,
};
