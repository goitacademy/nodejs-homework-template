import { User } from "../service/schemas/User.js";

export const getUserByEmail = (email) => {
  return User.findOne({ email }).lean;
};

export const updateUser = (email, fields) => {
  return User.findOneAndUpdate(
    { email: email },
    { $set: fields },
    { new: true }
  );
};
