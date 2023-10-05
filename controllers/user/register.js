import bcrypt from "bcryptjs";
import User from "../../models/user-model.js";
import { HttpError } from "../../helpers/index.js";
import { ctrlWrapper } from "../../decorators/index.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  
  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

export default ctrlWrapper(register);