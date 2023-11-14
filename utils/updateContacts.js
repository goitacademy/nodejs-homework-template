import fs from "fs";
import { listContacts } from "./listContacts.js";
import { contactsPath } from "./contactsPath.js";
export async function updateContacts(contactId, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return false;
  }
  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updatedContact;
  try {
    await fs.promises.writeFile(contactsPath, JSON.stringify(contacts));
    return updatedContact;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}
