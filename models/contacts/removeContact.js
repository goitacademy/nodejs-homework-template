import { listContacts } from "./listContacts.js";
import { updateContacts } from "./updateContacts.js";

export const removeContact = async (id) => {
  const contacts = await listContacts();
  const indx = contacts.findIndex((el) => el.id === id);
  if (indx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(indx, 1);
  await updateContacts(contacts);
  return removedContact;
};
