const express = require("express");
const authRouter = express.Router();
const tryCatchWrapper = require("../../helpers");
const validationBody = require("../../middleware/validationBody");
const schemaReg = require("../../schemas.joi/schema.joi.auth");
const { userRegistration } = require("../../controllers/auth.controllers");

authRouter.post(
  "/users/signup",
  validationBody(schemaReg),
  tryCatchWrapper(userRegistration)
);

module.exports = authRouter;
