const http = require("http");
const app = require("./app");
require("dotenv").config();
const connectDB = require("./config/db");
const { initSocket, getIO } = require("./socket");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

initSocket(server);

app.use((req, res, next) => {
  req.io = getIO();
  next();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
