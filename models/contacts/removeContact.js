import { readContacts, writeContacts } from "../../helpers/index.js";

export const removeContact = async (contactId) => {
  const contacts = await readContacts();
  const filteredContacts = contacts.filter(
    (contact) => contact.id !== contactId
  );

  if (filteredContacts.length === contacts.length) {
    throw new Error("Not found.");
  }

  await writeContacts(filteredContacts);
};
