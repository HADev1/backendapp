const mapTypeId = require("../../common/utils/map-id");
const validations = require("../utils/validations/user");
const userService = require("../../common/services/user");
const schemaValidate = require("../../common/utils/validate-schema");
const providerService = require("../../common/services/provider-detail");
const mapUserRooms = require("../utils/map-user-rooms");

async function getRoomsForUser(req, res) {
  const loggedInUserId = req.user.id;
  const rooms = await userService.findRoomsForUser(loggedInUserId);
  const userFilterRooms = mapUserRooms(rooms.rooms, loggedInUserId);
  res.send({rooms: userFilterRooms});
}

async function getProviderDetail(req, res) {
  const providerDetail = await providerService.findByUserId({
    userId: req.user.id,
  });
  res.send({providerDetail});
}

async function updateUserProfile(req, res) {
  const cleanFields = await schemaValidate(validations.userProfile, req.body);
  await userService.updateUserProfile({
    userId: req.user.id,
    name: cleanFields.name,
  });

  res.send({message: "Successfully update user profile"});
}

async function updateProviderDetail(req, res) {
  const cleanFields = await schemaValidate(
    validations.providerDetail,
    req.body
  );
  await providerService.createOrUpdate({userId: req.user.id, ...cleanFields});

  res.send({message: "Successfully update provider detail"});
}

module.exports = {getRoomsForUser, getProviderDetail, updateUserProfile, updateProviderDetail};
