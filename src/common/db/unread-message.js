const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
});

const UnreadMessage = mongoose.model("UnreadMessage", schema);
module.exports = UnreadMessage;
