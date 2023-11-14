import fs from "fs";
import { listContacts } from "./listContacts.js";
import { contactsPath } from "./contactsPath.js";

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const indexDeleteContact = contacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexDeleteContact !== -1) {
      const editedContacts = contacts.filter(
        (contact) => contact.id !== contactId
      );
      await fs.promises.writeFile(contactsPath, JSON.stringify(editedContacts));
      return true;
      // const deleteContact = contacts.splice(indexDeleteContact, 1);
      // return deleteContact;
    }
    return false;
  } catch (er) {
    console.log(`Error ${er}`);
  }
}
