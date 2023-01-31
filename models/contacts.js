import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";
import { RequestError } from "../helpers/RequestError.js";

const contactsPath = path.resolve("./models/contacts.json");
export async function listContacts() {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

async function updateContacts(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!contact) {
    throw RequestError(404, "Not found");
  }
  return contact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  contacts.splice(contactIdx, 1);
  await updateContacts(contacts);
  return "contact deleted";
}

export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  contacts.push({
    id: nanoid(),
    name,
    email,
    phone,
  });
  await updateContacts(contacts);
  return contacts.slice(-1)[0];
}

export async function updateContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();
  const contactIdx = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIdx === -1) {
    return null;
  }
  contacts[contactIdx] = { id: contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[contactIdx];
}
