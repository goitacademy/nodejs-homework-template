import bcrypt from "bcrypt";
import User from '../models/user.js';

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const { SECRET_KEY } = process.env;


const register = async (req, res) => {
  const { email, password } = req.body;
   const user = await User.User.findOne({ email });
 
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,    
  });
};


const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Invalid email or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw HttpError(401, "Invalid email or password");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: { email: user.email, subscription: user.subscription },
  });
};


const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};


const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};


const updateSubscription = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOneAndUpdate(
    { _id },
    { subscription: req.body.subscription },
    { new: true }
  );

  const { email, subscription } = user;

  res.status(200).json({ email, subscription });
};


export default {
   register: ctrlWrapper(register),
   login: ctrlWrapper(login),   
   getCurrent: ctrlWrapper(getCurrent),   
   logout: ctrlWrapper(),
   updateSubscription: ctrlWrapper(updateSubscription),
}
