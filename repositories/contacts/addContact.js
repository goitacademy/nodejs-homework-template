import { User } from "../../models/schemas/userSchema.js";

export const addContact = (body) => {
  return User.create(body);
};
