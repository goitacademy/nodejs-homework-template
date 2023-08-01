const express = require("express");
const validateBody = require("../../decorators/validateBody");
const { authenticate } = require("../../middlewares/index");
const { getAll }  = require("../../controllers/contacts/index");

const {
    userSignupSchema,
    userSigninSchema,
  } = require("../../schemas/users-schemas");

const authController  = require("../../controllers/auth/index")


const authRouter = express.Router();

authRouter.get("/", getAll);

authRouter.post("/register", validateBody(userSignupSchema), authController.signup);

authRouter.post("/login", validateBody(userSigninSchema), authController.signin);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.signout);

module.exports = authRouter;