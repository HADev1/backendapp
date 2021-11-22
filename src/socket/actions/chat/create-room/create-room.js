module.exports = (createRoomInDb, saveRoomForUser, addUserToProviderList, socketUtils) => {
  return (socket) => {
    return async (fields, cb) => {
      const userId = socket.request.user.id;

      try {
        const userIds = [userId, fields.userId];

        const room = await createRoomInDb({userIds});
        await saveRoomForUser({userId: room.user1, roomId: room.id});
        await saveRoomForUser({userId: room.user2, roomId: room.id});
        await addUserToProviderList(userId, fields.userId);

        if (cb) cb(room);
      } catch (err) {
        socket.emit(
          socketUtils.serverException,
          "Some problem while creating room"
        );
      }
    };
  };
};
