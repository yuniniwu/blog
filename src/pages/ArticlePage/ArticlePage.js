import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getArticle } from '../../WebAPI';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

function Article({ articleId }) {
  const [article, setArticle] = useState([]);

  useEffect(() => {
    getArticle(articleId).then((data) => setArticle(data));
  }, [articleId]);

  return (
    <ArticleContainer>
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
};

export default function ArticlePage() {
  let { articleId } = useParams();

  return (
    <Container>
      <Article articleId={articleId}></Article>
    </Container>
  );
}
