import { getContactById } from "./index.js";
import { readContacts, writeContacts } from "../../helpers/index.js";

export const updateContact = async (contactId, body) => {
  const contacts = await readContacts();
  const updatedContact = await getContactById(contactId);
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  for (const key in body) {
    updatedContact[key] = body[key];
  }

  contacts[contactIndex] = updatedContact;
  await writeContacts(contacts);

  return updatedContact;
};
