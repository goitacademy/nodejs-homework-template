import User from '../models/user.js';

import { ctrlWrapper } from '../decorators/index.js';
import { HttpError } from '../helpers/index.js';

const register = async (req, res) => {
  const { email } = req.body;
  const existsEmail = await User.findOne({ email });
  if (existsEmail) {
    throw HttpError(409, 'Email in use');
  }

  const newUser = await User.create(req.body);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

export default {
  register: ctrlWrapper(register),
};
