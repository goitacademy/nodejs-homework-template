import express from "express";

import { LogOut } from "../../controller/users/logOut.js";
import { currentUser } from "../../controller/users/currentUser.js";
import { login } from "../../controller/users/login.js";
import { registration } from "../../controller/users/register.js";
import authMiddleware from "../../middlewares/jwt.js";

const router = express.Router();

router.post("/signup", registration);

router.post("/login", login);

router.post("/logout", authMiddleware, LogOut);

router.get("/current", authMiddleware, currentUser);
export { router };
