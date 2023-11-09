import express from "express";

import { LogOut } from "../../controllers/users/logOut.js";
import { currentUser } from "../../controllers/users/currentUser.js";
import { login } from "../../controllers/users/login.js";
import { registration } from "../../controllers/users/register.js";
import authMiddleware from "../../middlewares/jwt.js";

const router = express.Router();

router.post("/signup", registration);

router.post("/login", login);

router.post("/logout", authMiddleware, LogOut);

router.get("/current", authMiddleware, currentUser);
export { router };
