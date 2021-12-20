import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import contacts from "./contacts.json";
import { fileURLToPath } from "url";
import req from "express/lib/request";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const listContacts = async () => {
  return contacts;
};

const getContactById = async (contactId) => {
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contactsForRemove = contacts.find((contact) => contact.id == contactId);
  if (contactsForRemove) {
    const contactsNew = contacts.filter(
      (contact) => contact !== contactsForRemove
    );
    await fs.writeFile(
      path.join(__dirname, "contacts.json"),
      JSON.stringify(contactsNew, null, 2)
    );
    return contactsForRemove;
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContent();
  const newContact = { name, email, phone, id: randomUUID() };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, "contacts.json"),
    JSON.stringify(contacts, null, 2)
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contactsForUpdateIndex = contacts.findIndex(
    (contact) => contact.id == contactId
  );
  if (contactsForUpdateIndex !== 1) {
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
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
