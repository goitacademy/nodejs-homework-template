import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../../controllers/auth";
import wrapperError from "../../middlewares/error-handler";

const router = express.Router();

router.post("/signup", wrapperError(signupController));

router.post("/login", wrapperError(loginController));

router.post("/logout",  wrapperError(logoutController));

export default router;