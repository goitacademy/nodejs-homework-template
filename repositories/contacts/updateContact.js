import { readDataFromFile } from "../../services/readDataFromFile.js";
import { writeDataToFile } from "../../services/writeDataToFile.js";

export async function updateContact(contactId, body) {
  const contacts = await readDataFromFile();
  const indexToUpdate = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexToUpdate >= 0) {
    contacts[indexToUpdate] = { ...contacts[indexToUpdate], ...body };
    await writeDataToFile(contacts);
    return contacts[indexToUpdate];
  }
}
