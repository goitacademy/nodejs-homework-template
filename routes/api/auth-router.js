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

const authRouter = express.Router()
authRouter.post("/register",isEmptyBody, signup); 

authRouter.post("/login",isEmptyBody, signin);

authRouter.get("/current", authenticate, getCurrent)

authRouter.post("logout", authenticate,signout);

authRouter.patch("/", isEmptyBody, authenticate, updateSubscription);
export default  authRouter