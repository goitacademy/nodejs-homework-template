import { readDataFromFile } from "../../services/readDataFromFile.js";

export async function getContactById(contactId) {
  const contacts = await readDataFromFile();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    console.log(`There is no contact with id: ${contactId}`);
  } else {
    console.table([contact]);
  }
}
