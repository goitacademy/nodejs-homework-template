import express from "express";

import authMiddleware from "../../auth.js";
import { logOut } from "../../controllers/users/logOut.js";
import { logIn } from "../../controllers/users/logIn.js";
import { signUp } from "../../controllers/users/signUp.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

router.get("/logout", authMiddleware, logOut);

export { router };
