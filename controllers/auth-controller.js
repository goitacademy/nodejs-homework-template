import { User } from "../models/User.js";

import { ctrlErrorWrapper } from "../decorators/index.js";

const signup = async (res, req) => {
  console.log(req.body);
  const user = await User.create(req.body);
  res.status(201).json({
    email: user.email,
    password: user.password,
    subscription: user.subscription,
  });
};

export default {
  signup: ctrlErrorWrapper(signup),
};
