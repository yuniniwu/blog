import { useState, useEffect } from 'react';
import { getPostByRange } from '../../WebAPI';
import PostItem from '../../components/PostItem';
import { Container } from '../../style/commonLayout';
import styled from 'styled-components';
import { ReactComponent as HomeImg } from '../../image/HomeImg.svg';
import { Link } from 'react-router-dom';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  & svg {
    max-width: 100%;
    height: auto;
  }
`;

const MorePosts = styled(Link)`
  text-align: center;
  display: block;
  max-width: 6rem;
  margin: 0 auto;
  text-decoration: none;
  font-weight: 400;
  padding: 0.4rem 0.8rem;
  margin-bottom: 1rem;
  box-shadow: 0px 0px 15px 2px ${({ theme }) => theme.colors.shadow};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.button.background};
  color: ${({ theme }) => theme.colors.button.text};

  &:hover {
    background-color: ${({ theme }) => theme.colors.button.text};
    color: ${({ theme }) => theme.colors.button.background};
  }
`;

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const limit = 2;

  useEffect(() => {
    getPostByRange(0, limit).then((res) => {
      res.json().then((posts) => setPosts(posts));
    });
  }, []);

  return (
    <Container>
      <ImageWrapper>
        <HomeImg />
      </ImageWrapper>

      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <MorePosts>More Posts</MorePosts>
    </Container>
  );
}
