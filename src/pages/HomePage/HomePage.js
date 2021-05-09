import { useState, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getPostByRange } from '../../WebAPI';
import Pagination from '../../components/Pagination';

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

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPosts, setCurrentPosts] = useState([]);
  const limit = 5;

  const totalPost = useRef(null);

  useEffect(() => {
    getPostByRange((currentPage - 1) * limit, limit).then((res) => {
      // 從 response header 拿到 posts 總筆數
      totalPost.current = res.headers.get('x-total-count');
      res.json().then((posts) => setCurrentPosts(posts));
    });
  }, [currentPage]);

  const totalPage = Math.ceil(totalPost.current / limit);

  // for pagination
  const pageArray = [];
  for (let i = 1; i <= totalPage; i++) {
    pageArray.push(i);
  }

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
