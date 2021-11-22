const Exceptions = require("../../common/utils/custom-exceptions");

module.exports = async function (err, req, res, next) {
  let statusCode = 500;
  let message = "Server error";
  //   let name = "SERVER_ERROR";
  let errors = [];

  console.log(err);

  if (err instanceof Exceptions.HttpError) {
    if (err instanceof Exceptions.ValidationError) {
      errors = err.errors;
    }
    statusCode = err.statusCode;
    message = err.message;
    // name = err.name;
  }

  res.status(statusCode).send({ message, errors });
};
