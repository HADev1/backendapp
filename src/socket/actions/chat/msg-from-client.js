const { emitters } = require("../../utils/event-name");

module.exports = (pushChatMessageToDb) => {
  return (io, socket) => {
    return async (fields, cb) => {
      const userId = socket.request.user.id;
      const existingRoomId = Array.from(socket.rooms)[1];

      const chat = await pushChatMessageToDb({
        userId,
        roomId: existingRoomId,
        message: fields.message,
      });

      if (cb) cb({ message: "Message saved" });

      socket.to(existingRoomId).emit(emitters.serverChatMsgBroadCast, { chat });
    };
  };
};
