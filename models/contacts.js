const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");
// console.log(contactsPath);
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  // console.log(JSON.parse(data));
  return JSON.parse(data);
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
