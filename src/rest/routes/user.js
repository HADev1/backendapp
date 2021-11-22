const express = require("express");
const userController = require("../controllers/user");
const isAuth = require("../middlewares/is-auth");
const hasRole = require("../middlewares/has-role");

const router = express.Router();
router.get("/rooms", isAuth, userController.getRoomsForUser);
router.get(
  "/provider-detail",
  isAuth,
  hasRole("isProvider"),
  userController.getProviderDetail
);
router.patch("/profile", isAuth, userController.updateUserProfile);
router.patch(
  "/provider-detail",
  isAuth,
  hasRole("isProvider"),
  userController.updateProviderDetail
);

module.exports = router;
