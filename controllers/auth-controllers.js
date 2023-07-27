import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

import User from "../models/user.js";

const signup = async (req, res) => {
  const newUser = await User.create(req.body);

  req.status(201).join({
    name: newUser.name,
    email: newUser.email,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
