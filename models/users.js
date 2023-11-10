import { User } from "../service/schemas/User.js";

export const getUserByEmail = (email) => {
  return User.findOne({ email }).lean;
};

export const updateUser = (id, fields) => {
  return User.findByIdAndUpdate(
    { _id: id },
    { $set: fields },
    { new: true }
  );
};
