const express = require("express");


const { validateBody } = require("../../middelwares");
const { schemasUser } = require("../../models");
const ctrl = require("../../controllers/auth");
const route = express.Router();

route.post("/register", validateBody(schemasUser.registerSchema), ctrl.register)

module.exports = route;