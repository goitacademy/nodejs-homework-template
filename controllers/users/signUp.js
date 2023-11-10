import { User } from "#models/User.js";
import bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already used!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ user: { email: user.email, subscription: user.subscription } });
  } catch (err) {
    next(err);
  }
};
