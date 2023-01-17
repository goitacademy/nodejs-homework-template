const express = require("express");
const authRouter = express.Router();
const { register, login } = require("../../controllers/auth.controller");
const {
  validateBody,
  checkIfBodyExists,
  checkIfBodyStatusExists,
} = require("../../middleWares/checkBodyRequest");
const {
  contactSchema,
  contactStatusSchema,
} = require("../../schema/validateSchema");
const { tryCatcher } = require("../../helpers/helpers");

authRouter.post("/signup", tryCatcher(register));
authRouter.post("/login", tryCatcher(login));

module.exports = authRouter;
