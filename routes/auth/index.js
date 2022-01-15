import express from "express";
import {
  signupController,
  loginController,
  logoutController,
} from "../../controllers/auth";
// import limiter from '../../middlewares/rate-limit'
// import guard from "../../middlewares/guard";
// const router = new Router()
const router = express.Router();

router.post("/signup", signupController);

router.post("/login", loginController);

router.post("/logout",  logoutController);

export default router;