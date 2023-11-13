import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve("models", "contacts.json");

const updateContacts = (contacts) => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

// function is return the list of all contacts
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}
// function is return contact by id
async function getById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}
// function is remove contact and return this removing contact
async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return deletedContact;
}

// function is add new contact and return it
async function addContact(body) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

// function is update contact
const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...contacts[index], ...body };
  await updateContacts(contacts);
  return contacts[index];
};

export default {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
};
