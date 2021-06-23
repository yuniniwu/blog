import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MEDIA_QUERY_MD } from '../../style/breakpoint';

const PostContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.card.background};
  color: ${({ theme }) => theme.colors.card.text};
  margin: 2rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: space-between;
  border-radius: 10px;
  box-shadow: 0px 0px 20px 10px ${({ theme }) => theme.colors.shadow};

  ${MEDIA_QUERY_MD} {
    flex-direction: column;
    margin: 20px;
  }
`;

const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-right: 2rem;
  & :nth-child(even) {
    margin: 10px 0;
  }
`;

const RightWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${MEDIA_QUERY_MD} {
  }
`;

const PostTitle = styled.h3`
  font-size: 1.5rem;
`;

const PostTime = styled.div`
  color: ${({ theme }) => theme.colors.placeholder};
`;

const Author = styled(Link)`
  text-decoration: none;
  &:hover {
    box-shadow: 0px -5px 0px 0px ${({ theme }) => theme.colors.button.dangerBg} inset;
  }
`;

const PostPreview = styled.p`
  max-width: 480px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: normal;

  ${MEDIA_QUERY_MD} {
    -webkit-line-clamp: 1;
  }
`;

const ReadMore = styled(Link)`
  font-size: 1.2rem;
  text-decoration: none;
  align-self: flex-end;

  &:hover {
    box-shadow: 0px -5px 0px 0px ${({ theme }) => theme.colors.button.dangerBg} inset;
  }
`;

export default function PostItem({ post }) {
  return (
    <PostContainer>
      <LeftWrapper>
        <PostTitle>{post.title}</PostTitle>
        <PostPreview>{post.body}</PostPreview>
        <ReadMore to={`/posts/${post.id}`}>more ...</ReadMore>
      </LeftWrapper>
      <RightWrapper>
        <Author to={`/author/${post.userId}`}>{post.user.nickname}</Author>
        <PostTime>{new Date(post.createdAt).toLocaleDateString()}</PostTime>
      </RightWrapper>
    </PostContainer>
  );
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
};
