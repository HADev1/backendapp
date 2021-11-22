const config = require("config");
const jwt = require("jsonwebtoken");
const Exceptions = require("../../common/utils/custom-exceptions");

module.exports = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    next(new Exceptions.BadRequest({ message: "Token not provided" }));
    return;
  }

  try {
    const decoded = jwt.verify(token, config.get("jwt.secret"));
    socket.request.user = decoded;
    next();
  } catch (err) {
    next(
      new Exceptions.AccessDenies({ message: "Invalid Token or maybe expired" })
    );
  }
};
