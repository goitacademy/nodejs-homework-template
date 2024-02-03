import fs from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactsPath = join(__dirname, "models/contacts.json");

export const readContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

export const writeContacts = async (contactsParsed) => {
  await fs.writeFile(contactsPath, JSON.stringify(contactsParsed, null, 2));
};

export const findContactIndexById = async (contactId) => {
  const contactsParsed = await readContacts();
  return contactsParsed.findIndex((contact) => contact.id === contactId);
};
