import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getArticle } from '../../WebAPI';
import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../context.js';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
`;

const ArticleContainer = styled.div`
  padding: 16px;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  clear: both;
`;

const ArticleInfo = styled.div`
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const Author = styled.p``;

const ArticleTime = styled.p``;

const ArticleBody = styled.p`
  white-space: pre-wrap;
`;

const EditArticleButton = styled(Link)`
  font-size: 1.2rem;
  display: inline-block;
  background: #555;
  color: #fff;
  border: 1px solid black;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  float: right;

  &:hover {
    transform: scale(1.2);
  }
`;

function Article({ articleId, user }) {
  const [article, setArticle] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getArticle(articleId).then((data) => setArticle(data));
  }, [articleId]);

  useEffect(() => {
    user && user.id === article.userId && setIsEdit(true);
  }, [user, article.userId]);

  return (
    <ArticleContainer>
      {isEdit && (
        <EditArticleButton to={`/edit-page/${articleId}`} children='編輯文章' />
      )}
      <Title>{article.title}</Title>
      <ArticleInfo>
        <Author>作者：{article.userId}</Author>
        <ArticleTime>
          {new Date(article.createdAt).toLocaleString()}
        </ArticleTime>
      </ArticleInfo>
      <ArticleBody>{article.body}</ArticleBody>
    </ArticleContainer>
  );
}

Article.propTypes = {
  articleId: PropTypes.string,
  user: PropTypes.object,
};

export default function ArticlePage() {
  let { articleId } = useParams();
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Article articleId={articleId} user={user}></Article>
    </Container>
  );
}
