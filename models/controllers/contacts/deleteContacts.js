import { listContacts } from "./indexContacts.js";
import fs from "fs";
import path from "path";

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

export async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const contactToRemove = data.find((element) => element.id === contactId);
    const updatedContacts = data.filter((element) => element.id !== contactId);
    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return contactToRemove;
  } catch (e) {
    console.log(e.toString());
  }
}
