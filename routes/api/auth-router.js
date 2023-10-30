const express = require("express");

const { signup } = require("../../controllers");

const authRouter = express.Router();

module.exports = { authRouter };
