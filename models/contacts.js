import fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.join(process.cwd(), "/models/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.filter((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const updateContact = async (contactId, name, email, phone) => {
  const contacts = await fs.writeFile(
    contactsPath,
    JSON.stringify(contactId, (name, email, phone))
  );
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  return removeContact;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: contacts.length + 1, name, email, phone };
  contacts.push(newContact);
  if (!newContact) {
    return null;
  }
  return newContact;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
