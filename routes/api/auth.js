const express = require("express")
const AuthController = require("../../controllers/authController")
const {validateBody} = require("../../middlewares/validation");
const {joiSignUpSchema, joiSignInSchema} = require("../../models/auth");
const auth = require('../../middlewares/auth')

const AuthRouter = express.Router();

AuthRouter.post("/signup", validateBody(joiSignUpSchema), AuthController.signup);

AuthRouter.post("/signin", validateBody(joiSignInSchema), AuthController.signin);

AuthRouter.get("/logout", auth, AuthController.logout);

module.exports = AuthRouter;