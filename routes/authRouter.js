import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({ email }, { _id: 1 }).lean();
  if (user) {
    return res.status(409).send("User already exists");
  }
  try {
    const newUser = new User({ username, email });
    await newUser.setPassword(password); // Przekazanie hasła do metody setPassword()
    await newUser.save();
    res.status(201).json({ message: "User created", user: newUser }); // Poprawiony status odpowiedzi
  } catch (error) {
    console.error("Error creating user:", error); // Logowanie błędu w konsoli
    res.status(500).json({ message: "Error creating user" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (!user) {
    return res.status(401).json("User does not exist");
  }
  const isPasswordCorrect = await user.validatePassword(password);
  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.jeson({ token });
  } else {
    return res.status(401).json("Wrong password");
  }

  res.json("login ok");
});

export default router;
