import express from "express";
import { login, registration } from "../../controller/userControllers.js";

import authMiddleware from "../../middlewares/jwt.js";
const router = express.Router();

router.post("/signup", registration);

router.post("/login", login);

router.get("/something", authMiddleware, (req, res, next) => {
  const result = res.locals.user;
  console.log(result);
  res.json({ message: "something" });
});

export { router };
