import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { getAuthorArticles } from '../../WebAPI';
import PostItem from '../../components/PostItem';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
`;

const Heading = styled.h2`
  font-size: 1.5rem;

  mark {
    display: inline-block;
    box-sizing: border-box;
    background-color: #e6fcf2;
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
