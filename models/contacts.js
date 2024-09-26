import fs from "fs/promises";
import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  let contactsList = [];
  await fs
    .readFile(contactsPath, "utf8")
    .then((contacts) => {
      contactsList = JSON.parse(contacts);
    })
    .catch((error) => console.log(error.message));
  return contactsList;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find((c) => c.id === contactId);
  return contactById;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.find((c) => c.id === contactId);
  if (!deletedContact) {
    return null;
  }
  const filteredContacts = contacts.filter((c) => c.id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  return filteredContacts;
};

const addContact = async (body) => {
  const newContact = { ...body };
  const contacts = await listContacts();
  const updatedContactsList = [...contacts, newContact];
  fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const contactById = contacts.find((c) => c.id === contactId);
  if (!contactById) {
    return null;
  }
  const updatedContact = { ...body, id: contactId };
  const filteredContacts = contacts.filter((c) => c.id !== contactId);
  const updatedContactsList = [...filteredContacts, updatedContact];
  fs.writeFile(contactsPath, JSON.stringify(updatedContactsList));
  return updatedContact;
};

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
