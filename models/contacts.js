import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const contactsPath = path.join(process.cwd(), "./models/contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

export async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const ind = contacts.findIndex((item) => item.id === contactId);
  if (ind === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(ind, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
}

export async function updateContact(contactId, { name, email, phone }) {
  const contacts = await listContacts();
  const ind = contacts.findIndex((c) => c.id === contactId);
  if (ind === -1) {
    return null;
  }
  contacts[ind] = { id: contactId, name, email, phone };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[ind];
}
