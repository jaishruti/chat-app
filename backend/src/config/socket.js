import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

//creates socket.io server instance
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

//to get socket id of the receiver
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// - This object maps each user’s ID to their current socket connection ID.
// - It helps you know who’s online and how to reach them.

const userSocketMap = {};

// - When a user connects, their userId is extracted from the query string.
// - Their socket ID is stored in userSocketMap.
// - io.emit("getOnlineUsers", ...) broadcasts the list of online users to everyone.
// - On disconnect, the user is removed and the updated list is broadcast again.
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, server, app };
