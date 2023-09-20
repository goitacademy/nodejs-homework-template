const express = require("express");
const userSchemas = require("../../schemas/user-schemas");
const validateBody = require("../../decorators/validateBody");
const controllersUser = require("../../controllers/auth-controller");
const { validToken } = require("../../middleware/validation/index");

const authRouter = express.Router();

const userRegisterValidate = validateBody(userSchemas.registerSchema);
const userLoginValidate = validateBody(userSchemas.loginSchema);

authRouter.post("/register", userRegisterValidate, controllersUser.register);
authRouter.post("/login", userLoginValidate, controllersUser.login);
authRouter.get("/current", validToken, controllersUser.getCurrent);
authRouter.post("/logout", validToken, controllersUser.logout);

module.exports = authRouter;
