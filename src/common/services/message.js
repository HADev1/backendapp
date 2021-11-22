const db = require("../db");

async function listAllMessagesByRoom(roomId) {
  return db.Message.find({roomId});
}

async function saveMessage({message, roomId, senderId}) {
  const newMessage = new db.Message({roomId, senderId, description: message});
  return await newMessage.save();
}

module.exports = {listAllMessagesByRoom, saveMessage};
