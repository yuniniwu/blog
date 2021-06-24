import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getPost = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`)
    .then((res) => res.json())
    .catch((err) => console.error('getPost API Error: ', err));
};

export const getPostByRange = (offset, limit) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_start=${offset}&_limit=${limit}&_expand=user`
  )
    .then()
    .catch((err) => console.error('getPostByRange API Error: ', err));
};

export const getArticle = (postId) => {
  return fetch(`${BASE_URL}/posts/${postId}?_expand=user`)
    .then((res) => res.json())
    .catch((err) => console.error('getArticle API Error: ', err));
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error('login API Error: ', err));
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error('getMe API Error: ', err));
};

export const register = (username, password, nickname) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error('register API Error: ', err));
};

export const newPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error('newPost API Error: ', err));
};

export const editPost = (id, title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
      createdAt: new Date().valueOf(),
    }),
  })
    .then((res) => res.json())
    .catch((err) => console.error('editPost API Error: ', err));
};

export const deletePost = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.error('deletePost API Error: ', err));
};

export const getAuthorArticles = (id) => {
  return fetch(`${BASE_URL}/posts?userId=${id}&_expand=user`)
    .then((res) => res.json())
    .catch((err) => console.error('getAuthorArticles API Error: ', err));
};

export const getMessages = () => {
  return fetch(`${BASE_URL}/comments?_sort=createdAt&_order=desc`)
    .then((res) => res.json())
    .catch((err) => console.error('getMessages API Error: ', err));
};

export const newMessages = (value) => {
  return fetch(`${BASE_URL}/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(value),
  })
    .then((res) => res.json())
    .catch((err) => console.error('newMessages API Error: ', err));
};
