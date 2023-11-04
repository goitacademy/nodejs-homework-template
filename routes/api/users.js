import express from "express";
import { registration } from "../../controller/userControllers.js";
import { User } from "../../service/schemas/User.js";
import { getUserByEmail } from "../../models/users.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const user = await User.find();
  res.json({ user });
});

router.post("/signup", registration);

router.post("/test", async (req, res, next) => {
  const { email } = req.body;
  const test = await User.findOne({email});
  console.log(test);
  res.json(test);
});

export { router };
