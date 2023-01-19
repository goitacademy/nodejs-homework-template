const express = require("express");

const routerUsers = express.Router();
const { users: ctrl } = require("../../controllers/index");
routerUsers.get("/current", ctrl.getCurrent);

module.exports = routerUsers;
