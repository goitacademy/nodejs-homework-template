import express from "express";
import auth from "../middlewares/authorization.js";
import upload from "../middlewares/upload.js";
import usersController from "../controllers/users.js";

const router = express.Router();

router.post("/signup", usersController.register);

router.post("/login", usersController.login);

router.post("/logout", auth, usersController.logout);

router.post("/verify", usersController.reverifyEmail);

router.get("/current", auth, usersController.getCurrent);

router.get("/verify/:verificationToken", usersController.verifyEmail);

router.patch("/subscriptions", auth, usersController.setSubscription);

router.patch("/avatars", auth, upload.single("avatar"), usersController.updateAvatar);

export default router;
