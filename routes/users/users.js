import express from "express";
import {
  userSignupController,
  userLoginController,
  userLogoutController,
  userCurrentController,
} from "../../controllers/users";

const router = express.Router();

router.post("/signup", userSignupController);

router.post("/login", userLoginController);

router.get("/logout", userLogoutController);

router.get("/current", userCurrentController);

export default router;