import { readDataFromFile } from "../../services/readDataFromFile.js";

export async function getContactById(contactId) {
  {
    const contacts = await readDataFromFile();
    return contacts.find((el) => el.id === contactId);
  }
}
