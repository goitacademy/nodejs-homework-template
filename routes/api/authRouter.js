const express = require("express");
const userSchemas = require("../../schemas/user-schemas");
const validateBody = require("../../decorators/validateBody");
const controllersUser = require("../../controllers/auth-controller");
const { validToken, upload } = require("../../middleware/validation/index");

const authRouter = express.Router();

const userRegisterValidate = validateBody(userSchemas.registerSchema);
const userLoginValidate = validateBody(userSchemas.loginSchema);

authRouter.post("/register", userRegisterValidate, controllersUser.register);
authRouter.post("/login", userLoginValidate, controllersUser.login);
authRouter.get("/current", validToken, controllersUser.getCurrent);
authRouter.post("/logout", validToken, controllersUser.logout);
authRouter.patch(
  "/avatars",
  validToken,
  upload.single("avatarURL"),
  controllersUser.updateAvatar
);

module.exports = authRouter;
