import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context.js';
import { Container } from '../../style/commonLayout';
import OneArticle from '../../components/OneArticle';

export default function SingleArticlePage() {
  let { articleId } = useParams();
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <OneArticle id={articleId} user={user} />
    </Container>
  );
}
