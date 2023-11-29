import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contactById = contacts.find((item) => item.id === contactId);

  return contactById || null;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToRemoveIndex = await contacts.findIndex(
    (item) => item.id === contactId
  );

  const [removedContact] = contacts.splice(contactToRemoveIndex, 1);
  if (contactToRemoveIndex === -1) {
    return null;
  }
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

export async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return newContact;
}