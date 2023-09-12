import express from "express";
import userSchema from "../../models/User.js"
import {validateBody} from "../../decorators/index.js";
import ctrlAuth from "../../controllers/ctrlAuth.js";

const authRouter = express.Router()

const userSignupSchema = validateBody(userSchema.userSignupSchema)
const userLoginSchema = validateBody(userSchema.loginSignupSchema)
authRouter.post("/signup", userSignupSchema, ctrlAuth.signup)

authRouter.post("/login", userLoginSchema, ctrlAuth.login)
export default authRouter