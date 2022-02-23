const { Router } = require("express");
// const { validateSignUpSchema } = require("../../middleware/validate");
const { validateSignUpSchema, validateLoginSchema } = require("./auth.schemas");
// const {} = require("");
const {
  authService,
  loginUser,
  logoutUser,
  currentUser,
} = require("./auth.service");
const { authorize } = require("./authorize.middleware");

const authRouter = Router();

authRouter.post("/signup", validateSignUpSchema, authService);

authRouter.post("/login", validateLoginSchema, loginUser);

authRouter.get("/logout", authorize(), logoutUser);

authRouter.get("/current", authorize(), currentUser);

exports.authRouter = authRouter;
