const mapTypeId = require("../../common/utils/map-id");
const userActivityStatus = require("../../common/services/activity-status");

function mapUserRooms(rooms, loggedInUserId) {
  if (!rooms || rooms.length === 0) return [];
  return rooms.map(_room => {
    const room = _room._doc;

    if (!room.user1._id.equals(loggedInUserId))
      return filterItems(room, room.user1);
    if (!room.user2._id.equals(loggedInUserId))
      return filterItems(room, room.user2);
  });
}

module.exports = mapUserRooms;

function filterItems(room, user) {
  const {__v, password, email, rooms, ...userFields} = user._doc;
  const activity = userActivityStatus.getUserStatus(userFields._id);
  return {id: room._id, lastMsg: room.lastMsg, user: mapTypeId(userFields), activity};
}