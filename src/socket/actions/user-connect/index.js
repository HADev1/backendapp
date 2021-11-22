const activityStatus = require("../../../common/services/activity-status");

function userConnect(socket) {
    const userId = socket.request.user.id;
    const socketId = socket.id;
    activityStatus.userConnects({user: userId, socketId});

    console.log("user connect: ", socket.id);
    return "User connect: " + socket.id;
}

module.exports = userConnect;
