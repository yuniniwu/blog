import { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPost, getPostByRange } from '../../WebAPI';

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
  border-bottom: 1px solid #555;
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
  text-align: center;
  padding: 1rem 0;
  font-size: 1.2rem;

  p {
    margin-top: 1rem;
  }

  button {
    font-size: 1.2rem;
    margin: 0 1rem;
  }
`;

const PaginationList = styled.a`
  padding: 0 1rem;
  cursor: pointer;

  ${(prop) =>
    prop.$active &&
    `
      background: rgba(0,0,0,0.15)
    `}
`;

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}

function Pagination({
  pageArray,
  handlePageChanged,
  currentPage,
  handleCurrentPosts,
}) {
  return (
    <PaginationWrap>
      <Button onClick={handlePageChanged}>上一頁</Button>
      {pageArray.map((item) => {
        return (
          <PaginationList
            key={item}
            $active={currentPage === item}
            onClick={handleCurrentPosts}
          >
            {item}
          </PaginationList>
        );
      })}
      <Button onClick={handlePageChanged}>下一頁</Button>
    </PaginationWrap>
  );
}

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState(posts);
  const limit = 5;

  useLayoutEffect(() => {
    // get posts - all
    getPost().then((posts) => setPosts(posts));
    // get posts - only 1st page
    getPostByRange(0, limit).then((posts) => {
      setCurrentPosts(posts);
    });
  }, []);

  const totalPage = Math.ceil(posts.length / limit);

  // for pagination
  const pageArray = [];
  for (let i = 1; i <= totalPage; i++) {
    pageArray.push(i);
  }

  useEffect(() => {
    getPostByRange((currentPage - 1) * limit, limit).then((posts) =>
      setCurrentPosts(posts)
    );
  }, [currentPage]);

  const handlePageChanged = useCallback(
    (e) => {
      const target = e.target.innerText;

      if (target === '上一頁') {
        if (currentPage <= 1) return;
        setCurrentPage((currentPage) => currentPage - 1);
      }

      if (target === '下一頁') {
        if (currentPage >= totalPage) return;
        setCurrentPage((currentPage) => currentPage + 1);
      }
    },
    [currentPage, totalPage]
  );

  const handleCurrentPosts = useCallback((e) => {
    const clickedPage = Number(e.target.innerText);
    setCurrentPage(clickedPage);
  }, []);

  return (
    <Container>
      {currentPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
      <Pagination
        pageArray={pageArray}
        handlePageChanged={handlePageChanged}
        currentPage={currentPage}
        handleCurrentPosts={handleCurrentPosts}
      />
    </Container>
  );
}
