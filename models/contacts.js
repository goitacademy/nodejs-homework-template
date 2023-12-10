const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  // Возвращает массив контактов.
  try {
    return JSON.parse(await fs.readFile(contactsPath));
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {};

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
