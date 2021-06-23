// import styled from 'styled-components';
// import PropTypes from 'prop-types';
// import { getArticle, deletePost } from '../../WebAPI';
import { useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context.js';
import { Container } from '../../style/commonLayout';
import OneArticle from '../../components/OneArticle';

export default function ArticlePage() {
  let { articleId } = useParams();
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <OneArticle id={articleId} user={user} />
    </Container>
  );
}
