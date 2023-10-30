const express = require("express");

const { signup } = require("../../controllers");

const { isEmptyBody } = require("../../middlewares");

const { validateBody } = require("../../decorators");

const { userSignUpSchema, userSignInSchema } = require("../../models");

const authRouter = express.Router();

module.exports = { authRouter };
