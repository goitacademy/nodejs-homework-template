import { User } from "../model";
import { IUser } from "../helpers";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./../config";

const signup = async (user: IUser) => {
  const { email, password } = user;

  const newUser = new User({ email });
  newUser.setPassword(password);

  await newUser.save();

  return newUser;
};

const login = async (user: IUser) => {
  const searchedUser: IUser = await User.findOne({ email: user.email });
  const token = jwt.sign({ _id: searchedUser._id }, SECRET_KEY, {
    expiresIn: "1h",
  });

  await User.findByIdAndUpdate(searchedUser._id, { token });

  return { searchedUser, token };
};

const logout = async (user: IUser) => {
  await User.findByIdAndUpdate(user._id, {
    token: null,
  });
};

const current = async (user: IUser) => {
  const searchedUser: IUser = await User.findById(user._id);
  return searchedUser;
};

export { signup, login, logout, current };
