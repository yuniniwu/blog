import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAuthorArticles } from '../../WebAPI';
import PostItem from '../../components/PostItem';
import { useParams } from 'react-router-dom';
import { Container } from '../../style/commonLayout';

const Heading = styled.h2`
  font-size: 1.5rem;
  margin: 1rem;

  mark {
    display: inline-block;
    padding: 0 1rem;
    border-radius: 10px;
    box-shadow: 0px 0px 6px 3px ${({ theme }) => theme.colors.button.dangerBg}
      inset;
    background-color: ${({ theme }) => theme.colors.darkwhite};
    color: ${({ theme }) => theme.colors.card.text};
  }
`;

export default function AuthorArticlesPage() {
  let { userId } = useParams();
  const [currentPosts, setCurrentPosts] = useState([]);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    getAuthorArticles(userId).then((posts) => {
      setAuthor(posts[0].user.nickname);
      setCurrentPosts(posts);
    });
  }, [userId]);

  return (
    <Container>
      <Heading>
        這是 <mark>{author}</mark> 的所有文章
      </Heading>
      {currentPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </Container>
  );
}
