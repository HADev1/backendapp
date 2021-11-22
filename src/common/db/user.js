const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const normalize = require("normalize-mongoose");
const ProviderDetail = require("./provider-detail");

const schema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  isProvider: {
    type: Boolean,
    default: false,
  },
  rooms: [{type: mongoose.Schema.Types.ObjectId, ref: "Room"}],
  providers: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});

schema.plugin(normalize);

schema.pre("save", hashPassword);

function hashPassword(next) {
  var user = this;
  if (!user.password) return next();
  if (!user.isModified("password")) return next();
  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
}

// schema.post("save", async function (next) {
//   const user = this;
//   console.log("after save: ", user);
//
//   if (user.isProvider) {
//     const provider = new ProviderDetail({user: user._id});
//     await provider.save();
//   }
// });

schema.method("comparePassword", async function (password) {
  return await bcrypt.compare(password, this.password);
});

schema.method("generateToken", function () {
  const payload = _excludePassword(this._doc);
  return jwt.sign(payload, config.get("jwt.secret"));
});

schema.method("excludePassword", function () {
  return _excludePassword(this._doc);
});

function _excludePassword(user) {
  const {password, _id, __v, rooms, providers, ...fields} = user;
  return {...fields, id: _id};
}

const User = mongoose.model("User", schema);
module.exports = User;
