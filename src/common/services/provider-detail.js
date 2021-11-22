const db = require("../db");
const Exceptions = require("../utils/custom-exceptions");

async function findProvider(loggedInUserId) {
  const userInDb = await db.User.findById(loggedInUserId);
  if (!userInDb)
    throw new Exceptions.BadRequest({message: "User is not found"});
  const providerIdsToExclude = userInDb.providers;

  const findProviderCond = {user: {"$nin": [...providerIdsToExclude]}};
  const populateQuery = [{path: "user", select: "name email"}];

  return db.ProviderDetail.find(findProviderCond).populate(populateQuery);
}

async function findByUserId({userId}) {
  return db.ProviderDetail.findOne({user: userId});
}

async function createOrUpdate({userId, regNo, monthlyPrice, yearlyPrice}) {
  try {
    return await db.ProviderDetail.findOneAndUpdate(
      {user: userId},
      {userId, regNo, monthlyPrice, yearlyPrice},
      {upsert: true, new: true}
    );
  } catch (err) {
    throw new Exceptions.BadRequest({message: "Reg Number must be unique"});
  }
}

module.exports = {findProvider, findByUserId, createOrUpdate};
