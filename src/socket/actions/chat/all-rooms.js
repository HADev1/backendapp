module.exports = (listRoomsForUser) => {
  return (socket) => {
    return async (_, cb) => {
      const userId = socket.request.user.id;
      const rooms = await listRoomsForUser({ userId });

      if (cb) cb({ rooms });
    };
  };
};
