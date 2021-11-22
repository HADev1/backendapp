const mongoose = require("mongoose");
const normalize = require("normalize-mongoose");

const schema = new mongoose.Schema({
  description: String,
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: String,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  timestamp: {
    type: Date,
    default: new Date(),
  },
});
schema.plugin(normalize);

const Message = mongoose.model("Message", schema);
module.exports = Message;
