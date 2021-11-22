const express = require("express");
const providerController = require("../controllers/provider");
const isAuth = require("../middlewares/is-auth");

const router = express.Router();
router.get("/all-for-user", isAuth, providerController.getProviderList);

module.exports = router;