import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../../controllers/auth";

import guard from "../../middlewares/guard";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", guard, logoutController);

export default router;