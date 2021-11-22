const mongoose = require("mongoose");
const normalize = require("normalize-mongoose");

const schema = new mongoose.Schema({
  roomName: String,
  user1: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user2: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastMsg: String,
});

schema.plugin(normalize);

const Room = mongoose.model("Room", schema);
module.exports = Room;
