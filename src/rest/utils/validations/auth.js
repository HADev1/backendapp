const yup = require("yup");

const registerSchema = yup.object().shape({
  name: yup.string().min(8).required().label("Username"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().min(8).max(40).required().label("Password"),
  isProvider: yup
    .bool("Please select user type either provider or client")
    .required()
    .label("Client Type"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  password: yup.string().min(8).max(40).required().label("Password"),
});

module.exports = { registerSchema, loginSchema };
