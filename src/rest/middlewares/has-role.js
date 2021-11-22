const Exceptions = require("../../common/utils/custom-exceptions");

module.exports = (role) => {
  return (req, _, next) => {
    const user = req.user;

    if (!user[role])
      throw new Exceptions.AccessDenies({
        message: "Cann't perform this action. Invalid Role",
      });

    next();
  };
};
