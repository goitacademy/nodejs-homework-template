const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const rawData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const getContactsList = await listContacts();
    return getContactsList.find((contact) => String(contact.id) === String(contactId));
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
