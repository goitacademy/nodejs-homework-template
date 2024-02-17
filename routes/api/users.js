import express from "express";
import { signUp } from "../../controllers/users/signUp.js";
import { logIn } from "../../controllers/users/logIn.js";

const router = express.Router();

router.post("/signup", signUp);

router.post("/login", logIn);

export { router };
