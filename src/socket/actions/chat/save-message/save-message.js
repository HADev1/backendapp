module.exports = (saveMessageInDb, socketUtils, getUserActivityStatus) => {
  return (io, socket) => {
    return async (fields, cb) => {
      const roomId = Array.from(socket.rooms)[1];
      const userId = socket.request.user.id;

      console.log("roomId: ", roomId);
      console.log(
        "connected clients to room: ",
        io.sockets.adapter.rooms.get(roomId)
      );

      try {
        const message = await saveMessageInDb({
          message: fields.message,
          roomId,
          userId,
        });
        const msgStatus = _checkUserStatus(
          getUserActivityStatus,
          fields.opponentUser
        );

        if (cb) cb({ msgStatus });

        socket
          .to(roomId)
          .emit(socketUtils.emitters.serverChatMsgBroadCast, { message });
      } catch (err) {}
    };
  };
};

function _checkUserStatus(getUserActivityStatus, userId) {
  const user = getUserActivityStatus(userId);
  if (!user) return "offline";
  return "delivered";
}
