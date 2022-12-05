const fs = require("fs").promises;
const path = require("path");
const contactsPath = path.resolve(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs
    .readFile(contactsPath, "utf8")
    .then((data) => {
      list = JSON.parse(data);
      return list
    })
    
    .catch((error) => console.error(error));
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
