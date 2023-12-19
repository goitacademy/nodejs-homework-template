import User from "../models/User.js";
import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const signup = async (req, res) => {
  const newUser = await User.create(req.body);

  res.status(201).json({
    username: newUser.username,
    email: newUser.email,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
