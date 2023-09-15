import express from "express";
import userSchema from "../../models/User.js"
import {validateBody} from "../../decorators/index.js";
import ctrlAuth from "../../controllers/ctrlAuth.js";
import {authenticate} from "../../middlewars/index.js";

const authRouter = express.Router()

const userSignupSchema = validateBody(userSchema.userSignupSchema)
const userLoginSchema = validateBody(userSchema.loginSignupSchema)
const userRefreshTokenSchema = validateBody(userSchema.userRefreshTokenSchema)

authRouter.post("/signup", userSignupSchema, ctrlAuth.signup)
authRouter.post("/login", userLoginSchema, ctrlAuth.login)
authRouter.post("/current", authenticate, ctrlAuth.getCurrent)
authRouter.post("/refresh", userRefreshTokenSchema, ctrlAuth.getCurrent)
authRouter.post("/logout", authenticate, ctrlAuth.logout)
export default authRouter