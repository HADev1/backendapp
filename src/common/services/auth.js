const db = require("../db");
const userService = require("./user");
const Exceptions = require("../../common/utils/custom-exceptions");

async function createUser(userFields) {
  const isProfileComplete = userFields.isProvider === false;
  const fields = {...userFields, isProfileComplete};

  try {
    let user = new db.User({...fields});
    user = await user.save();

    if (userFields.isProvider) {
      const provider = new db.ProviderDetail({user: user._id});
      await provider.save();
    }

    return user;
  } catch (err) {
    console.log("error: ", err);
    throw new Exceptions.BadRequest({
      message: "Please try with different email",
    });
  }
}

async function login(userFields) {
  const user = await userService.findByEmail(userFields.email);

  if (!user || !(await user.comparePassword(userFields.password)))
    throw new Exceptions.BadRequest({message: "Credentials not matched"});

  return user;
}

module.exports = {createUser, login};
