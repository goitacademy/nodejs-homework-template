import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import contacts from "./contacts.json";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contactsForRemoveIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactsForRemoveIndex !== -1) {
    const [result] = contacts.splice(contactsForRemoveIndex, 1);
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return result;
  }
  return null;
};

const addContact = async ({ name, email, phone }) => {
  const newContact = { id: randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsForUpdateIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (contactsForUpdateIndex !== -1) {
    const contactsUpdated = {
      id: contactId,
      ...contacts[contactsForUpdateIndex],
      ...body,
    };
    contacts[contactsForUpdateIndex] = contactsUpdated;
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contacts, null, 2)
    );
    return contactsUpdated;
  }
  return null;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
