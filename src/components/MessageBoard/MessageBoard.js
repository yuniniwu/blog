import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalStyle from '../../constants/style.js';
import PropTypes from 'prop-types';

const API_ENDPOINT = 'https://student-json-api.lidemy.me/comments';

const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 30px;
  font-size: 1rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
`;

const MessageForm = styled.div`
  margin: 10px;
`;

const MessageNickName = styled.input`
  margin-bottom: 10px;
`;
const MessageTextArea = styled.textarea`
  display: block;
  width: 100%;
`;
const SubmitButton = styled.button`
  margin-top: 8px;
  font-size: 1rem;
`;

const MessageList = styled.div`
  margin: 10px;
`;

const MessageContainer = styled.div`
  padding: 20px;

  & + & {
    border-top: 1px solid black;
  }
`;
const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
`;
const Author = styled.p``;
const MessageTime = styled.p``;

const MessageBody = styled.p`
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: red;
`;

function MessageItem({ children, author, time }) {
  return (
    <MessageContainer>
      <MessageHeader>
        <Author>{author}</Author>
        <MessageTime>{time}</MessageTime>
      </MessageHeader>
      <MessageBody children={children} />
    </MessageContainer>
  );
}

MessageItem.propTypes = {
  children: PropTypes.node,
  author: PropTypes.string,
  time: PropTypes.string,
};

const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function MessageBoard() {
  const [messages, setMessages] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState({ nickname: '', body: '' });
  const [postMessageError, setPostMessageError] = useState();
  const [isLoadingPostMessage, setIsLoadingPostMessage] = useState(false);

  const { nickname, body } = value;

  const fetchMessages = () => {
    return fetch(API_ENDPOINT + '?_sort=createdAt&_order=desc')
      .then((response) => response.json())
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  };

  const handleInputChange = (e) => {
    const changedValue = e.target.value;
    const name = e.target.name;
    setValue({ ...value, [name]: changedValue });
  };

  const handleInputFocus = () => {
    setPostMessageError(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isLoadingPostMessage) return;
    setIsLoadingPostMessage(true);

    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoadingPostMessage(false);
        // 如果 fetch 拿到的資料有問題的話
        if (data.ok === 0) {
          setPostMessageError(data.message);
          return;
        }
        setValue({ nickname: '', body: '' });
        fetchMessages();
      })
      .catch((err) => {
        setIsLoadingPostMessage(false);
        setPostMessageError(err.message);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <>
      <GlobalStyle />
      <Container>
        {isLoadingPostMessage && <Loading children={'loading...'} />}
        <Title>留言板</Title>
        <MessageForm>
          暱稱：
          <MessageNickName
            name={'nickname'}
            value={nickname}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <MessageTextArea
            name={'body'}
            value={body}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            rows={10}
          ></MessageTextArea>
          <SubmitButton onClick={handleFormSubmit}>送出</SubmitButton>
          {postMessageError && <ErrorMessage>{postMessageError}</ErrorMessage>}
        </MessageForm>

        {messageApiError && (
          <ErrorMessage>
            something went wrong. {messageApiError.toString()}
          </ErrorMessage>
        )}

        {messages && messages.length === 0 && (
          <ErrorMessage>No message fetched</ErrorMessage>
        )}

        <MessageList>
          {messages &&
            messages.map((message) => (
              <MessageItem
                key={message.id}
                children={message.body}
                author={message.nickname}
                time={new Date(message.createdAt).toLocaleString()}
              />
            ))}
        </MessageList>
      </Container>
    </>
  );
}
