import { listContacts } from "./listContacts.js";

export async function getContactsById(contactsId) {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactsId) || null;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}
