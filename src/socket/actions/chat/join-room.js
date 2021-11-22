const mapTypeId = require("../../../common/utils/map-id");

module.exports = (singleRoomDb, findUserByIds) => {
  return (socket) => {
    return async (fields, cb) => {
      const userId = socket.request.user.id;
      const roomId = fields.roomId;
      socket.join(roomId);

      try {
        const _roomInDb = await singleRoomDb({ roomId });
        const _users = await findUserByIds(_roomInDb.users);

        const chatHistory = _roomInDb.chatHistory.map((chat) =>
          mapTypeId(chat)
        );
        const users = _users.map((user) => mapTypeId(user));

        if (cb) cb({ chatHistory, users });
      } catch (err) {
        console.log("error: ", err);
      }
    };
  };
};
