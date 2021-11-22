const mongoose = require("mongoose");
const config = require("config");

mongoose.Promise = global.Promise;

mongoose.connect(config.get("db.connString"), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const conn = mongoose.connection;

conn.on("error", () => console.error.bind(console, "connection error"));
conn.once("open", () => console.info("Connection to Database is successfull"));

module.exports = conn;

// module.exports = async () => {
//   console.log("Please wait .... Db is connecting ...");

//   try {
//     const connection = await mongoose.connect(
//       "mongodb://localhost:27017/chat-app",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       }
//     );

//     console.log("Successfully connected to db ...");
//     return connection;
//   } catch (err) {
//     console.log("Error while connecting to database ..", err);
//   }
// };
