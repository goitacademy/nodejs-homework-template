import { User } from "./schemas/schema.js";

export const checkingUserExist = (email) => User.findOne({ email });

export const createUser = (email, pwd) => {
  const user = new User({ email });
  user.setHashPassword(pwd);
  user.save();
  return user;
};

export const createTokenToUser = (email, tk) =>
  User.findOneAndUpdate({ email }, { token: tk }, { new: true });

export const checkUserById = (id) => User.findById({ _id: id });

export const logoutUser = (id) =>
  User.findByIdAndUpdate({ _id: id }, { token: null }, { new: true });

export const updateUserSubscription = (id, sub) =>
  User.findByIdAndUpdate({ _id: id }, { subscription: sub }, { new: true });
