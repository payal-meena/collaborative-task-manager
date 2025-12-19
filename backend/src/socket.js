let io;

const initSocket = (server) => {
  io = require("socket.io")(server, {
    cors: {
      origin: "https://collaborative-task-manager-ochre.vercel.app/",
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

module.exports = { initSocket, getIO };
