const fs = require("fs/promises");
const path = require("node:path");
const { nanoid } = require("nanoid");
const contactsPath = path.resolve(__dirname, "../models/contacts.json");

const readContacts = async () => {
  try {
    const contactRaw = await fs.readFile(contactsPath, { encoding: "utf8" });
    const contacts = JSON.parse(contactRaw);
    return contacts;
  } catch (error) {
    console.error(error.message);
  }
};

const listContacts = async () => {
  try {
    const data = await readContacts();
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await readContacts();
    return data.find((contact) => contact.id === contactId);
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await readContacts();
    const uData = data.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(uData, null, 2));
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  try {
    const contactsDB = await readContacts();
    const contact = { id: nanoid(), name, email, phone };
    const uData = [...contactsDB, contact];
    await fs.writeFile(contactsPath, JSON.stringify(uData, null, 2));
    return contact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contactsDB = await readContacts();
    const index = contactsDB.findIndex((contact) => contact.id === contactId);
    contactsDB[index] = { id: contactId, body };
    fs.writeFile(contactsPath, JSON.stringify(uData, null, 2));
    return contactsDB[index];
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
