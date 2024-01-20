import { Router } from "express";
import { signup } from "../controllers/signup.js";
import { login } from "../controllers/login.js";
import { logout } from "../controllers/logout.js";
import { current } from "../controllers/current.js";

const router = Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/current", current);

export default router;
