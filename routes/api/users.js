const express = require("express");

const routerUsers = express.Router();
const { auth } = require("../../middlewares/index");
const { users: ctrl } = require("../../controllers/index");
routerUsers.get("/current", auth, ctrl.getCurrent);

module.exports = routerUsers;
