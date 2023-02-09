const express = require("express");

const { register } = require("../../controllers/auth.controller");
const { tryCatchWrapper } = require("../../utils/helpers/rtyCatchHelper");

const authRouter = express.Router();

authRouter.post("/register", tryCatchWrapper(register));

module.exports = {
  authRouter,
};
