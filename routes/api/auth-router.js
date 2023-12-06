import express from "express"
import {
  signup,
  signin,
  getCurrent,
  signout,
  updateSubscription,
} from "../../controllers/auth-controller.js";
import authenticate from "../../middlewares/authenticate.js";
import isEmptyBody from "../../middlewares/isEmptyBody.js";
import { userSignupSchema,userSigninSchema } from "../../models/User.js";
const authRouter = express.Router()
authRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userSignupSchema),
  signup
); 
import validateBody from '../../decorators/validaterBody.js'
authRouter.post("/login", isEmptyBody, validateBody(userSigninSchema), signin);

authRouter.get("/current", authenticate, getCurrent)

authRouter.post("/logout", authenticate,signout);

authRouter.patch("/", isEmptyBody,  updateSubscription);
export default  authRouter