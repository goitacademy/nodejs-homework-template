const express = require("express");

const routerUsers = express.Router();

const { getCurrent } = require("../../controllers/index");

routerUsers.get("/current", getCurrent);

module.exports = routerUsers;
