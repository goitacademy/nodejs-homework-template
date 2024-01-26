import { User } from "../../models/schemas/userSchema.js";

export const updateContact = (contactId, body) => {
  return User.findByIdAndUpdate({ _id: contactId }, body);
};
