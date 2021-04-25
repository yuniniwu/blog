import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost } from '../../WebAPI';

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
`;

const PostContainer = styled.div`
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  font-size: 1.5rem;
  text-decoration: none;
  color: black;
`;

const PostTime = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/posts/${post.id}`}>{post.title}</PostTitle>
      <PostTime>{new Date(post.createdAt).toLocaleString()}</PostTime>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};

const PaginationWrap = styled.div`
  /* width: 50%; */
  /* margin: 0 auto; */
  text-align: center;
  padding: 1rem 0;
  font-size: 1.2rem;
`;

const Paginationlist = styled.a`
  display: inline-block;
  padding: 0.2rem;
`;

function Pagination({ length, limit }) {
  const [page, setPage] = useState([]);

  useEffect(() => {
    setPage(Math.ceil(length / limit));
  }, [length, limit]);

  return (
    <PaginationWrap>
      <button>上一頁</button>
      <Paginationlist>1</Paginationlist>
      <Paginationlist>2</Paginationlist>
      <Paginationlist>3</Paginationlist>
      <button>下一頁</button>
      <p>總共有 {page} 頁</p>
    </PaginationWrap>
  );
}

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const limit = 5;

  // if (posts.length > limit)

  useEffect(() => {
    getPost(limit).then((posts) => setPosts(posts));
  }, []);

  return (
    <Container>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination length={posts.length} limit={limit} />
    </Container>
  );
}
