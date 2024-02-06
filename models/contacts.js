const { readFile } = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  return readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((err) => console.log(err));
};

const getContactById = async (contactId) => {
  return readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .then((contacts) => contacts.find((contact) => contact.id === contactId))
    .catch((err) => console.log(err));
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
