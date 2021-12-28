import express from "express";
import {
  userSignupController,
  userLoginController,
  userLogoutController,
  userCurrentController,
} from "../../controllers";

const router = express.Router();

router.post("/users/signup", userSignupController);

router.post("/users/login", userLoginController);

router.get("/users/logout", userLogoutController);

router.get("/users/current", userCurrentController);

export default router;
