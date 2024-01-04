import React, { useRef, useState, useEffect } from 'react';
import { IoSend } from 'react-icons/io5';

export default function Chat({ socket }) {
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      setMessageList((current) => [...current, data]);
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const handleSubmit = () => {
    const message = messageRef.current.value.trim();

    if (!message) return;

    socket.send(JSON.stringify({ type: 'message', text: message }));

    clearInput();
    focusInput();
  };

  const getEnterKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const clearInput = () => {
    messageRef.current.value = '';
  };

  const focusInput = () => {
    messageRef.current.focus();
  };

  return (
    <div style={{ padding: '10em' }}>
      <p></p>

      <h1>Envie uma mensagem</h1>

      {messageList.map((message, index) => (
        <p
          style={{
            borderStyle: 'solid',
            borderColor: 'black',
            borderRadius: '15px',
            padding: '0.5em',
          }}
          key={index}
        >
          {message.author}: {message.text}
        </p>
      ))}
      <input
        type="text"
        ref={messageRef}
        placeholder="Mensagem"
        onKeyDown={(e) => getEnterKey(e)}
      />
      <button onClick={() => handleSubmit()}>
        <IoSend style={{ marginLeft: '0.4em', marginRight: '0.3em' }} />
      </button>
    </div>
  );
}
