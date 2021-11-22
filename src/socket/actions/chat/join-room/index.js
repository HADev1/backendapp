const joinRoom = require("./join-room");
const messageService = require("../../../../common/services/message");

module.exports = joinRoom(messageService.listAllMessagesByRoom);
