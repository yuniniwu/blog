import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getPost = () => {
  return fetch(`${BASE_URL}/posts?_sort=createdAt&_order=desc`).then((res) =>
    res.json()
  );
};

export const getPostByRange = (offset, limit) => {
  return fetch(
    `${BASE_URL}/posts?_sort=createdAt&_order=desc&_start=${offset}&_limit=${limit}`
  ).then((res) => res.json());
};

export const getArticle = (postId) => {
  return fetch(`${BASE_URL}/posts/${postId}`).then((res) => res.json());
};

export const login = (username, password) => {
  return fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }).then((res) => res.json());
};

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const register = (username, password, nickname) => {
  return fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname: nickname,
      username: username,
      password: password,
    }),
  }).then((res) => res.json());
};

export const newPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: title,
      body: body,
    }),
  }).then((res) => res.json());
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
      title: title,
      body: body,
      createdAt: new Date().valueOf(),
    }),
  }).then((res) => res.json());
};

export const deletePost = (id) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
