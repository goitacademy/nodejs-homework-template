import { Contact } from "#models/Contact.js";

export const listContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    return error;
  }
};
