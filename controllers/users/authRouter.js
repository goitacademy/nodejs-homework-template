import express from "express";
import jwt from 'jsonwebtoken'
import User from "../../models/User.js";

const router = express.Router();

router.post("/register", async (req, res, next) => {
  const { username, email, password } = req.body;
  //validacja Joi
  //////////////////////////////////////////////
  const user = await User.findOne({ email }, { _id: 1 }).lean();
  if (user) {
    return res.status(409).json({ message: "This email already taken" });
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
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
    const user = await User.findOne({ email });
    
  if (!user) {
    return res.status(401).json({ message: "no such user" });
  }

  const isPasswordCorrect = await user.validatePassword(password);
  if (isPasswordCorrect) {
    const payload = {
      id: user._id,
      username: user.username,
      };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "12h" })
      return res.json({token})
  } else {
    return res.status(401).json({ message: "wrong user" });
  }
  
});

export default router;
