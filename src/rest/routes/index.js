const express = require("express");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const providerRoutes = require("./provider");

const router = express.Router();
router.get("/", (_, res) => res.send({message: "HomePage"}));
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/provider", providerRoutes);

module.exports = router;
