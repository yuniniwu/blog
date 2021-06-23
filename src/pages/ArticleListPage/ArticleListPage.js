import { useState, useCallback, useEffect, useRef } from 'react';
import { getPostByRange } from '../../WebAPI';
import Pagination from '../../components/Pagination';
import PostItem from '../../components/PostItem';
import { Container } from '../../style/commonLayout';

export default function ArticleListPage() {
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
      const target = e.target.id;

      if (target === 'back') {
        if (currentPage <= 1) return;
        setCurrentPage((currentPage) => currentPage - 1);
      }

      if (target === 'forward') {
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
        <PostItem key={post.id} post={post} />
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
