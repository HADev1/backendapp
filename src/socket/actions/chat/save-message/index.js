const saveMessage = require("./save-message");
const messageService = require("../../../../common/services/message");
const socketUtils = require("../../../utils/event-name");
const activityStatus = require("../../../../common/services/activity-status");

module.exports = saveMessage(
  messageService.saveMessage,
  socketUtils,
  activityStatus.getUserStatus
);
