// routes\api\auth.js
const express = require("express");
const controller = require("../../controllers/auth");
const validateSchemas = require("../../middlewares/validateSchemas");
const { ensureAuthenticated } = require("../../middlewares/validateJWT");
const schemasJoi = require("../../models/schemas");


const authRouter = express.Router();

module.exports = () => {
  authRouter.post(
    "/signup", ensureAuthenticated,
    validateSchemas(schemasJoi.registerSchema, "body"),
    controller.signup
  );


  authRouter.post(
    "/log-in",
    validateSchemas(schemasJoi.loginSchema, "body"),
    controller.login
  );


  return authRouter;
};
