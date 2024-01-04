import React, { useRef } from 'react';
import { IoMdPersonAdd } from 'react-icons/io';

export default function Join({ setChatVisibility, setSocket }) {
  const usernameRef = useRef();

  const getEnterKey = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const handleSubmit = () => {
    const username = usernameRef.current.value.trim();

    if (!username) return;

    const socket = new WebSocket('ws://localhost:3001');

    socket.addEventListener('open', (event) => {
      socket.send(JSON.stringify({ type: 'set_username', username }));
      
      setSocket(socket);

      setChatVisibility(true);
    });
  };

  return (
    <div>
      <h1>Entrar no WhatsApp 2.0</h1>
      <input type="text" ref={usernameRef} placeholder="Nome do usuário" onKeyDown={(e) => getEnterKey(e)} />
      <button id="button" onClick={() => handleSubmit()}>
        entrar <IoMdPersonAdd id="icon-entrar" />
      </button>
    </div>
  );
}
