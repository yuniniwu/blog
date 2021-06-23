import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const PaginationWrap = styled.div`
  text-align: center;
  padding: 1rem 0;
  font-size: 1.2rem;
`;

const PaginationList = styled.a`
  margin: 0 1rem;
  padding: 0 0.2rem;
  cursor: pointer;

  ${(props) =>
    props.$active &&
    `
      border-bottom: 4px solid #16694E
    `}
`;

function Button({ handleClick, children, id }) {
  return (
    <button id={id} className='btn' onClick={handleClick}>
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
      <Button id='back' handleClick={handlePageChanged}>
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
      <Button id='forward' handleClick={handlePageChanged}>
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
