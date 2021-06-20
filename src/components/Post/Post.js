import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostContainer = styled.div`
  background-color: lightgray;
  color: green;
  margin: 20px 0;
  padding: 16px;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border-radius: 10px;
`;

const LeftWrapper = styled.div`
  flex: 1;
  & :nth-child(even) {
    margin: 10px 0;
  }
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
`;

const PostTime = styled.div`
  color: rgba(0, 0, 0, 0.5);
`;

const Author = styled.div`
  margin-bottom: 10px;
`;

const PostPreview = styled.p`
  width: 480px;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const ReadMore = styled(Link)`
  text-decoration: none;
  color: black;

  &:hover {
    border-bottom: 2px solid lightcoral;
  }
`;

export default function Post({ post }) {
  return (
    <PostContainer>
      <LeftWrapper>
        <PostTitle>{post.title}</PostTitle>
        <PostPreview>{post.body}</PostPreview>
        <ReadMore to={`/posts/${post.id}`}>Read More</ReadMore>
      </LeftWrapper>
      <RightWrapper>
        <Author>author</Author>
        <PostTime>{new Date(post.createdAt).toLocaleDateString()}</PostTime>
      </RightWrapper>
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.object,
};
