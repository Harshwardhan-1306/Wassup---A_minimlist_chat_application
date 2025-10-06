import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: ["https://ubiquitous-pancake-pj9r56wqj4gxh6pqg-5173.app.github.dev"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}


//Used to store online user's userId and socketId mapping
const userSocketMap = {}; // { userId: socketId }

io.on('connection', (socket) => {
  console.log('A user is connected', socket.id);

  const userId = socket.handshake.query.userId;

  if(userId) userSocketMap[userId] = socket.id;

  // io.emit() is used to send events to all connected clients
  io.emit("getOnlineUser", Object.keys(userSocketMap)); 

  socket.on('disconnect', () => {
    console.log('A User is disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUser", Object.keys(userSocketMap))
  })
})

export { io, server, app };