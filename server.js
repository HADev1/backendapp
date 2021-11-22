const socketio = require("socket.io");
const app = require("./src/rest");
require("./src/common/db/connection");

// dbConnect();
let io;

async function bootstrap() {
  const PORT = process.env.PORT || 8000;

  const server = app.listen(PORT, () => {
    console.log(`App is listening on the port ${PORT}...`);
  });

  io = socketio(server, {
    cors: { origin: "*" },
    pingInterval: 2000,
    pingTimeout: 1000,
  });
}
bootstrap();

module.exports = { app, io };
