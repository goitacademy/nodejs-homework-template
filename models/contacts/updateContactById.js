import { listContacts } from "./listContacts.js";
import { updateContacts } from "./updateContacts.js";

export const updateContactById = async (id, body) => {
  const contacts = await listContacts();
  const indx = contacts.findIndex((el) => el.id === id);
  if (indx === -1) {
    return null;
  }
  contacts[indx] = { ...body, id };
  await updateContacts(contacts);
  return contacts[indx];
};
