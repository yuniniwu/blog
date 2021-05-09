// import { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

export default function Pagination({
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

Pagination.propTypes = {
  pageArray: PropTypes.array,
  handlePageChanged: PropTypes.func,
  currentPage: PropTypes.number,
  handleCurrentPosts: PropTypes.func,
};
