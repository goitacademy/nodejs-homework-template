const { log } = require("console");
const fs = require("fs/promises");
const path = require("path");

let nanoid;
import("nanoid").then((module) => {
  nanoid = module.nanoid;
});

const contactsPath = path.join(__dirname, "./contacts.json");

const getAll = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(`Error reading contacts from file: ${error.message}`);
    return [];
  }
};

const updateContacts = async (contacts) => {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  } catch (error) {
    console.error(`Error updating contacts in file: ${error.message}`);
    throw error;
  }
};

const listContacts = async () => {
  const contacts = await getAll();
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await getAll();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const addContact = async (name, email, phone) => {
  if (!name || !email || !phone) {
    return null;
  }
  const contacts = await getAll();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

module.exports = addContact;

const updateContact = async (contactId, body) => {
  const contacts = await getAll();
  const contactIndex = contacts.findIndex(
    (contact) => contact.id === contactId
  );

  if (contactIndex === -1) {
    return null;
  }

  const updatedContact = { ...contacts[contactIndex], ...body };
  contacts[contactIndex] = updatedContact;

  await updateContacts(contacts);
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
