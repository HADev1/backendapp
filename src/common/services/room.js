const mongoose = require("mongoose");
const db = require("../db");
const Exceptions = require("../../common/utils/custom-exceptions");
const mapTypeId = require("../utils/map-id");

async function getSingleRoom({roomId}) {
  const room = await db.Room.findById(roomId);
  if (!room) throw new Exceptions.NotFound({message: "Room is not found"});
  return room;
}

async function getAllRoomsForUser({userId}) {
  return db.Room.find({users: userId}).populate("users");
}

async function createRoom({userIds}) {
  const room = new db.Room({user1: userIds[0], user2: userIds[1]});
  return mapTypeId(await room.save());
}

async function pushMessageToChat({roomId, userId, message}) {
  const chat = {
    _id: mongoose.Types.ObjectId(),
    user: userId,
    message,
    dateTime: new Date(),
  };

  await db.Room.updateOne({_id: roomId}, {$push: {chatHistory: chat}});
  return chat;
}

module.exports = {
  getSingleRoom,
  getAllRoomsForUser,
  createRoom,
  pushMessageToChat,
};
