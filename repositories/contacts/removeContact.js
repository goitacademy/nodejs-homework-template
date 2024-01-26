import { User } from "../../models/schemas/userSchema.js";

export const removeContact = (contactId) => {
  return User.findByIdAndDelete({ _id: contactId });
};
