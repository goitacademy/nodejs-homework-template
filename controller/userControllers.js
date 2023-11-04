import { getUserByEmail } from "../models/users.js";
import { User } from "../service/schemas/User.js";

export const registration = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const newUser = new User({ email, subscription });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (error) {
    next(error);
  }
};
