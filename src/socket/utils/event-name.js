const emitters = {
  userConnect: "msg-from-server",
  serverChatMsgBroadCast: "server-chat-msg-broadcast",
  serverException: "server-exception",
};

const listeners = {
  rootIOConnect: "connect",
  userDisconnect: "disconnect",
  createRoom: "create-room",
  listRoomsForUser: "list-rooms-for-user",
  msgFromClient: "msg-from-client",
  joinRoom: "join-room",
};

module.exports = { emitters, listeners };
