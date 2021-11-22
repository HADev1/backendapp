const activityStatus = require("../../../common/services/activity-status");

function userDisconnect(socket) {
  console.log("user disconnect: ", socket.id);
}

module.exports = userDisconnect;
