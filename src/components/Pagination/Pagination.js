// import { useState, useCallback, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { MEDIA_QUERY_MD } from '../../style/breakpoint';

const PaginationWrap = styled.div`
  text-align: center;
  padding: 1rem 0;
  font-size: 1.2rem;
`;

const PaginationList = styled.a`
  margin: 0 1rem;
  padding: 0 0.2rem;
  cursor: pointer;

  ${(prop) =>
    prop.$active &&
    `
      border-bottom: 4px solid #BD4940
    `}
`;

function Button({ handleClick, children }) {
  return (
    <button className='btn' onClick={handleClick}>
      {children}
    </button>
  );
}

export default function Pagination({
  pageArray,
  handlePageChanged,
  currentPage,
  handleCurrentPosts,
}) {
  return (
    <PaginationWrap>
      <Button handleClick={handlePageChanged}>
        <IoIosArrowBack />
      </Button>
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
      <Button handleClick={handlePageChanged}>
        <IoIosArrowForward />
      </Button>
    </PaginationWrap>
  );
}

Pagination.propTypes = {
  pageArray: PropTypes.array,
  handlePageChanged: PropTypes.func,
  currentPage: PropTypes.number,
  handleCurrentPosts: PropTypes.func,
};
