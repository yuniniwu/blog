import { useState, useEffect } from 'react';
import { getPostByRange } from '../../WebAPI';
import PostItem from '../../components/PostItem';
import { Container } from '../../style/commonLayout';
import styled from 'styled-components';
import { ReactComponent as HomeImg } from '../../image/HomeImg.svg';

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;

  & svg {
    max-width: 100%;
    height: auto;
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
    </Container>
  );
}
