import express from "express";
import { registration } from "../../controller/userControllers.js";
import { User } from "../../service/schemas/User.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const user = await User.find();
  res.json({ user });
});

router.post("/signup", registration);

export { router };
