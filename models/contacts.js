const fs = require("fs/promises");
const contactsPath = require("../contactsPath");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const allContacts = JSON.parse(data);
    if (allContacts.length !== 0) {
      return allContacts;
    }
    return null;
  } catch (error) {
    console.error(error);
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
