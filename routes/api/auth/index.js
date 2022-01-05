import express from "express";
import { AuthControllers } from "../../../controllers";

import guard from "../../../midllewares/guard";
import limiter from "../../../midllewares/rateLimit";

const router = express.Router();
const authControllers = new AuthControllers();

router.post(
  "/signup",
  limiter(15 * 60 * 1000, 2),
  authControllers.signupController
);

router.post("/login", authControllers.loginController);

router.post("/logout", guard, authControllers.logoutController);

router.get("/current", guard, authControllers.getCurrentUserController);

export default router;
