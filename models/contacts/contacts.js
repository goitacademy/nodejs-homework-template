import fs from "fs/promises";
import path from "path";
// import { nanoid } from "nanoid"

const contactsPath = path.resolve("models", "contacts", "contacts.json");

console.log(contactsPath);
const listContacts = async () => {
  try {
    const dataListContacts = await fs.readFile(contactsPath);
    return JSON.parse(dataListContacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    const contactById = allContacts.find((contact) => contact.id === contactId);
    return contactById || null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
