import { User } from "#models/User.js";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { v4 as uuidv4 } from "uuid";
import { sendVerificationEmail } from "#utils/email.js";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already used!" });
    }

    const verificationToken = uuidv4();

    const avatarURL = gravatar.url(email, { s: "250", d: "identicon" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hashedPassword, avatarURL, verificationToken });

    await user.save();

    sendVerificationEmail(user.email, user.verificationToken);

    res.status(201).json({ user: { email: user.email, subscription: user.subscription, avatarURL: user.avatarURL } });
  } catch (err) {
    next(err);
  }
};
