import { User } from "../model";
import { IUser } from "../helpers";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "./../config";

const signupUser = async (user: IUser) => {
  const { email, password } = user;

  const newUser = new User({ email });
  newUser.setPassword(password);

  await newUser.save();

  return newUser;
};

const loginUser = async (user: IUser) => {
  const searchedUser: IUser = await User.findOne({ email: user.email });
  const token = jwt.sign(searchedUser._id.toString(), SECRET_KEY);

  return { searchedUser, token };
};

export { signupUser, loginUser };
