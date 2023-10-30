const express = require("express");

const { signup } = require("../../controllers");

const { isEmptyBody } = require("../../middlewares");

const authRouter = express.Router();

module.exports = { authRouter };
