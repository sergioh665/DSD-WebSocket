const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

const PORT = 3001;

wss.on('connection', (ws) => {
  console.log('Usuário conectado', ws._socket.remoteAddress);

  ws.on('close', (code, reason) => {
    console.log('Usuário desconectado', ws._socket.remoteAddress);
  });

  ws.on('message', (data) => {
    const message = JSON.parse(data);

    if (message.type === 'set_username') {
      ws.username = message.username;
    } else if (message.type === 'message') {
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({
              type: 'receiv_message',
              text: message.text,
              authorId: ws._socket.remoteAddress,
              author: ws.username,
            })
          );
        }
      });
    }
  });
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

server.listen(PORT, () => console.log('Servidor WebSocket iniciado'));
