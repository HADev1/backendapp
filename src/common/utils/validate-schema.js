const Exceptions = require("./custom-exceptions");

module.exports = async function (schema, fields, abortEarly = false) {
  try {
    return await schema.validate(fields, { abortEarly });
  } catch (ex) {
    throw new Exceptions.ValidationError({
      message: "Please enter valid information",
      errors: ex.errors,
    });
  }
};
