const userActivityStatus = {};

function getUserStatus({user}) {
  const activity = {
    lastActivity: null,
    status: "offline",
    socket: null
  };
  return userActivityStatus[user] ?? activity;
}

function userConnects({user, socketId}) {
  userActivityStatus[user] = {
    lastActivity: new Date(),
    status: "online",
    socket: socketId,
  };
}

function userDisconnects({user}) {
  userActivityStatus[user] = {
    lastActivity: new Date(),
    status: "offline",
  };
}

module.exports = {getUserStatus, userConnects, userDisconnects};
