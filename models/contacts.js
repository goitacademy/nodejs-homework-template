const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join("models", "contacts.json");

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const parseData = JSON.parse(data);
    return parseData;
  } catch (err) {
    console.log(err);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile(contactsPath);
    const parseData = JSON.parse(data);

    const contactMatch = parseData.find((contact) => contact.id === contactId);
    return contactMatch;
  } catch (err) {
    console.log(err);
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
