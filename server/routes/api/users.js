import express from "express";
import auth from "./authorization.js";
import usersController from "../controllers/users.js";

const router = express.Router();

router.post("/signup", usersController.register);

router.post("/login", usersController.login);

router.post("/logout", auth, usersController.logout);

router.get("/current", auth, usersController.getCurrent);

router.patch("/subscription", auth, usersController.setSubscription);

export default router;
