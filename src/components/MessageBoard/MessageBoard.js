import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container, ErrorMessage } from '../../style/commonLayout';
import { getMessage, newMessage } from '../../WebAPI';

const API_ENDPOINT = 'https://student-json-api.lidemy.me/comments';

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem 0;
`;

const MessageForm = styled.div`
  padding: 1rem;
  text-align: center;
`;

const MessageNickName = styled.input`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  outline: none;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.shadow};
`;
const MessageTextArea = styled.textarea`
  width: calc(100% - 1rem);
  padding: 0.5rem;
  font-size: 1.2rem;
  display: block;
  outline: none;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.shadow};
`;
const SubmitButton = styled.button`
  margin-top: 1rem;
  font-size: 1rem;
`;

const MessageList = styled.div`
  margin: 1rem;
`;

const MessageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.msg.background};
  color: ${({ theme }) => theme.colors.msg.text};
  border: 1px solid ${({ theme }) => theme.colors.shadow};
  border-radius: 10px;
  padding: 1.2rem;

  & + & {
    margin-top: 1rem;
  }
`;
const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
`;
const Author = styled.p``;

const MessageTime = styled.p`
  color: ${({ theme }) => theme.colors.placeholder};
`;

const MessageBody = styled.p`
  margin-top: 10px;
`;

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
    // TODO: 檢查輸入是否為空

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
    <Container>
      {isLoadingPostMessage && <Loading children={'loading...'} />}
      <Title>Message Board</Title>
      <MessageForm>
        <MessageNickName
          placeholder='nickname'
          name={'nickname'}
          value={nickname}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
        />
        <MessageTextArea
          placeholder='leave your message here'
          name={'body'}
          value={body}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          rows={10}
        ></MessageTextArea>
        <SubmitButton onClick={handleFormSubmit}>Submit</SubmitButton>
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
  );
}
