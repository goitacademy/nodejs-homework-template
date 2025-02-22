import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { register, login, logout, refresh } from "../controllers/auth.js";
import { registerSchema, loginSchema } from "../validation/auth.js";
import { validateBody } from "../middlewares/validateBody.js";

const router = express.Router();
const jsonParser = express.json();

router.post(
  "/auth/register",
  jsonParser,
  validateBody(registerSchema),
  ctrlWrapper(register)
);

router.post(
  "/auth/login",
  jsonParser,
  validateBody(loginSchema),
  ctrlWrapper(login)
);

router.post("/auth/refresh", ctrlWrapper(refresh));

router.post("/auth/logout", ctrlWrapper(logout));

export default router;
