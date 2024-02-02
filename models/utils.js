import fs from "fs/promises";
import path from "path";

const contactsPath = path.join(process.cwd(), "models/contacts.json");

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
