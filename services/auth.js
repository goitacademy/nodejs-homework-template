import { User } from "./schemas/schema.js";
import { v4 as uuidv4 } from "uuid";

export const checkingUserExist = (email) => User.findOne({ email });

export const createUser = (email, pwd, avatarURL) => {
  const user = new User({ email, avatarURL, verificationToken: uuidv4() });
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

export const updateAvatar = (id, avatarURL) =>
  User.findByIdAndUpdate({ _id: id }, { avatarURL }, { new: true });

export const verify = (email) => User.findOne({ email });

export const setVerified = (verificationToken) => {
  console.log(verificationToken);
  return User.findOneAndUpdate(
    { verificationToken },
    { verificationToken: null, verify: true },
    { new: true }
  );
};

export const checkVerify = (email) => User.findOne({ email });
