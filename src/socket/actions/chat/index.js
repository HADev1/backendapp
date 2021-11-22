const createRoom = require("./create-room/index");
const saveMessage = require("./save-message");
const joinRoom = require("./join-room/index");

module.exports = { createRoom, saveMessage, joinRoom };

// const roomService = require("../../../common/services/room");
// const userService = require("../../../common/services/user");

// const createRoom = require("./create-room")(roomService.createRoom);
// const listRoomsForUser = require("./all-rooms")(roomService.getAllRoomsForUser);
// const pushChatMsg = require("./msg-from-client")(roomService.pushMessageToChat);
// const joinRoom = require("./join-room")(
//   roomService.getSingleRoom,
//   userService.findByIds
// );

// module.exports = { listRoomsForUser, createRoom, pushChatMsg, joinRoom };
