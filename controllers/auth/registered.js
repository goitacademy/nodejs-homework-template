import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import { ctrlWrapper } from "../../decorator/index.js";
import { HttpError } from "../../helpers/index.js";

const registered = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  console.log(avatarURL);

  const newUser = await User.create({
    ...req.body,
    avatarURL,
    password: hashPassword,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
    avatarURL: newUser.avatarURL,
  });
};

export default ctrlWrapper(registered);
