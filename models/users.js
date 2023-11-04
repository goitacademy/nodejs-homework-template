import { User } from "../service/schemas/User.js";

export const getUserByEmail = (email) => {
  return User.findOne({ email }).lean;
};
