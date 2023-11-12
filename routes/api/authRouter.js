import express from "express";

import { LogOut } from "../../controllers/users/logOut.js";
import { currentUser } from "../../controllers/users/currentUser.js";
import { login } from "../../controllers/users/login.js";
import { registration } from "../../controllers/users/register.js";
import authMiddleware from "../../middlewares/jwt.js";
import { updateAvatar } from "../../controllers/users/updateAvatar.js";
import { uploadMiddleware } from "../../middlewares/upload.js";

const router = express.Router();

router.post("/signup", registration);

router.post("/login", login);

router.post("/logout", authMiddleware, LogOut);

router.get("/current", authMiddleware, currentUser);

router.patch("/avatars", uploadMiddleware.single("avatar"), updateAvatar);
export { router };
