import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  getCurrentUserController,
} from "../../../controllers/";

import guard from "../../../midllewares/guard";
import limiter from "../../../midllewares/rateLimit";

const router = express.Router();

router.post("/signup", limiter(15 * 60 * 1000, 2), signupController);

router.post("/login", loginController);

router.post("/logout", guard, logoutController);

router.get("/current", guard, getCurrentUserController);

export default router;
