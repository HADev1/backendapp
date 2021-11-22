const yup = require("yup");

const userProfile = yup.object().shape({
  name: yup.string().min(8).required().label("Username"),
});

const providerDetail = yup.object().shape({
  regNo: yup.string().required().label("Registratio Number"),
  monthlyPrice: yup.number().moreThan(0).required().label("Monthly Price"),
  yearlyPrice: yup.number().moreThan(0).required().label("Yearly Price"),
});

module.exports = { userProfile, providerDetail };
