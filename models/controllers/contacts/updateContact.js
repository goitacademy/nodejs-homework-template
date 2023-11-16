import { listContacts } from "./indexContacts.js";
import fs from "fs";
import path from "path";

const contactsPath = path.join(process.cwd(), "models", "contacts.json");

export async function updateContact(contactId, body) {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((e) => e.id === contactId);
    if (contactIndex === -1) {
      return null;
    }
    contacts[contactIndex] = { id: contactId, ...body };
    await fs.promises.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );
    return contacts[contactIndex];
  } catch (error) {}
}
