const db = require("../db");
const Exceptions = require("../utils/custom-exceptions");

async function findByIds(ids) {
  console.log("ids: ", ids);
  return db.User.find({
    _id: {$in: ids},
  }).select("-password");
}

async function findByEmail(email) {
  return db.User.findOne({email});
}

async function findRoomsForUser(userId) {
  return db.User.findById(userId)
    .populate({path: "rooms", populate: {path: "user1 user2"}})
    .select("rooms");
}

async function saveRoomForUser({userId, roomId}) {
  const userInDb = await db.User.findById(userId);
  console.log("userInDB: ", userInDb);
  if (userInDb) {
    userInDb.rooms.push(roomId);
    await userInDb.save();
  }
}

async function updateUserProfile({userId, name}) {
  const userInDb = await db.User.findById(userId);

  userInDb.name = name ?? userInDb.name;

  await userInDb.save();
}

async function updateProviderDetail({
                                      userId,
                                      regNo,
                                      monthlyPrice,
                                      yearlyPrice,
                                    }) {
  const userInDb = await db.User.findById(userId);

  try {
    userInDb.providerDetail = {regNo, monthlyPrice, yearlyPrice};
    userInDb.isProfileComplete = true;
    await userInDb.save();
  } catch (err) {
    throw new Exceptions.BadRequest({
      message: "Registration Number must be unique",
    });
  }
}

async function addUsersToProviderList(loggedInUserId, userId) {
  const userInDb = await db.User.findById(loggedInUserId);
  console.log("userInDb when saving to provider: ", userInDb);
  if (userInDb) {
    userInDb.providers.push(userId);
    return userInDb.save();
  }
}

module.exports = {
  findByIds,
  findByEmail,
  updateUserProfile,
  updateProviderDetail,
  saveRoomForUser,
  findRoomsForUser,
  addUsersToProviderList
};
