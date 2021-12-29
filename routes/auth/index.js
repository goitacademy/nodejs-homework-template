import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../../../controllers/";

import guard from "../../../midllewares/guard";

const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout", guard, logoutController);

export default router;