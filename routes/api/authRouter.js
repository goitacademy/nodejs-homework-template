import express from "express";
import {
  LogOut,
  currentUser,
  login,
  registration,
} from "../../controller/userControllers.js";
import { updateUser } from "../../models/users.js";
import authMiddleware from "../../middlewares/jwt.js";
import { User } from "../../service/schemas/User.js";
const router = express.Router();

router.post("/signup", registration);

router.post("/login", login);

router.post("/logout", authMiddleware, LogOut);

router.get("/current", authMiddleware, currentUser);
export { router };
