import { readDataFromFile } from "../../services/readDataFromFile.js";
import { writeDataToFile } from "../../services/writeDataToFile.js";
import { listContacts } from "./listContacts.js";

export async function removeContact(contactId) {
  const contacts = await readDataFromFile();
  const newContacts = contacts.filter((contact) => contact.id !== contactId);

  if (contacts.length > newContacts.length) {
    await writeDataToFile(newContacts);
    listContacts();
  }
  return false;
}
