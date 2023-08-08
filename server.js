const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 5000; // Puerto para el servidor Express

app.get('/', (req, res) => {
  res.send('El servidor de chat está funcionando.');
});

io.on('connection', (socket) => {
  console.log('Nuevo usuario conectado:', socket.id);

  socket.on('message', (data) => {
    io.emit('message', data);
  });

  socket.on('toggleWebcam', () => {
    io.emit('webcamToggled');
  });
});

server.listen(port, () => {
  console.log(`O servidor  está funcionando no http://localhost:${port}`);
});
