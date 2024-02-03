import express from "express";

import User from "../service/schemas/user.js";
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { email, password, } = req.body;
  const user = await User.findOne({ email }, { _id: 1 }).lean();
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const newUser = new User({ username, email });
    await newUser.setPassword(password);
    await newUser.save();
    return res.status(201).json({ message: "User created" });
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
});

export default router;
