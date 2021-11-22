const createRoom = require("./create-room");
const socketUtils = require("../../../utils/event-name");
const userService = require("../../../../common/services/user");
const roomService = require("../../../../common/services/room");

module.exports = createRoom(
  roomService.createRoom,
  userService.saveRoomForUser,
  userService.addUsersToProviderList,
  socketUtils
);
