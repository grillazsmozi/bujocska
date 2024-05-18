const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});
app.get('/fogo', (req, res) => {
  res.sendFile(join(__dirname, 'seeker.html'));
});
app.get('/AnnouncementSound', (req, res) => {
  res.sendFile(join(__dirname, 'Announcement.mp3'));
});
app.get('/MessageSound', (req, res) => {
  res.sendFile(join(__dirname, 'Message.mp3'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

    socket.on('silent message', (msg) => {
      io.emit('silent message', msg);
  });

    socket.on('announcement', (msg) => {
      io.emit('announcement', msg);
  });
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});