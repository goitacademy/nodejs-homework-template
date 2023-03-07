const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.resolve(__dirname, "/models/contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await listContacts.find((item) => item.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  } catch (error) {}
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
