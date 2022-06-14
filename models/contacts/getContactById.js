import { listContacts } from "./listContacts.js";

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === id);
  if (!contact) {
    return null;
  }
  return contact;
};
