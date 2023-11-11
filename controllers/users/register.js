import { User } from "../../service/schemas/User.js";
import "dotenv/config";
import gravatar from "gravatar";
export const registration = async (req, res, next) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email }).lean();
  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }
  try {
    const avatarURL = gravatar.url(email);
    const newUser = new User({ email, subscription, avatarURL });
    newUser.setPassword(password);
    await newUser.save();
    const newUserAfterSave = await User.findOne({ email });
    res.status(201).json({ newUserAfterSave });
  } catch (error) {
    next(error);
  }
};
