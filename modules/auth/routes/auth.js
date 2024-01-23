import { Router } from "express";

import "../services/auth.strategy.js";
import auth from "../middlewares/auth.js";

import { login } from "../controllers/login.js";
import { signup } from "../controllers/signup.js";
import { logout } from "../controllers/logout.js";
import { current } from "../controllers/current.js";
import { validateAuth } from "../middlewares/validation.js";
import { userValidation } from "../../users/services/auth.validation.js";

const router = Router();

router.post("/signup", validateAuth(userValidation), signup);

router.post("/login", validateAuth(userValidation), login);

router.post("/logout", auth, logout);

router.post("/current", auth, current);

export default router;
