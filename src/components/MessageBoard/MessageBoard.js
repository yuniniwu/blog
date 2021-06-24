import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Container, ErrorMessage } from '../../style/commonLayout';
import { getMessages, newMessages } from '../../WebAPI';

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
  children: PropTypes.node.isRequired,
  author: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default function MessageBoard() {
  const [messages, setMessages] = useState(null);
  const [messageApiError, setMessageApiError] = useState(null);
  const [value, setValue] = useState({ nickname: '', body: '' });
  const [postMessageError, setPostMessageError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { nickname, body } = value;

  useEffect(() => {
    getMessages()
      .then((data) => {
        setMessages(data);
      })
      .catch((err) => {
        setMessageApiError(err.message);
      });
  }, []);

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
    if (isLoading) return;

    setIsLoading(true);

    newMessages(value)
      .then((data) => {
        setIsLoading(false);
        if (!data.ok) {
          setPostMessageError(data.message);
          return;
        }
        setValue({ nickname: '', body: '' });
        getMessages();
      })
      .catch((err) => {
        setIsLoading(false);
        setPostMessageError(err.message);
      });
  };

  return (
    <Container>
      {isLoading && <Loading children={'loading...'} />}
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
