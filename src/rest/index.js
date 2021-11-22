const express = require("express");
require("express-async-errors");
const cors = require("cors");
const allRoutes = require("./routes");
const catchUnhandledExceptions = require("./middlewares/exception-handling");

const app = express();
app.use(cors({origin: "*"}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/../../public"));
app.use("/", allRoutes);
app.use(catchUnhandledExceptions);

module.exports = app;
