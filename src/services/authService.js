import bcrypt from 'bcrypt'; // hash, encode password
import { User } from '../models/userModel.js';
// import jwt from 'jsonwebtoken'; // JWT

export const signup = async ({ email, password, subscription }) => {
  const newUser = await User.create({ email, password, subscription });
  return newUser;
};

export const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
  }

  // if (!(await bcrypt.compare(password, user.password))) {
  //   throw new NotAuthorizedError(`Wrong password`);
  // }
  // const token = jwt.sign(
  //   {
  //     _id: user._id,
  //     email: user.email,
  //     createdAt: user.createdAt,
  //   },
  //   process.env.JWT_SECRET
  // );
  // return token;
};

export const logout = async (email, password) => {};

export const getCurrentUser = async (email, password) => {};

export const updateSubscription = async (email, password) => {};
