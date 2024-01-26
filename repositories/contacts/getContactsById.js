import { User } from "../../models/schemas/userSchema.js";

export async function getContactById(contactId) {
  return User.findOne({ _id: contactId });
}
