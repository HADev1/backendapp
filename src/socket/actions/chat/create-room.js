const mapTypeId = require("../../../common/utils/map-id");

module.exports = (createRoomDb) => {
  return (socket) => {
    return async (fields, cb) => {
      const userId = socket.request.user.id;

      const userIds = [userId, fields.userId];
      const room = await createRoomDb({ userIds });

      const { id } = mapTypeId(room);
      if (cb) cb({ roomId: id });
    };
  };
};
