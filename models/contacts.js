const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    return fs.readFile(contactsPath, "utf-8").then((data) => {
      const contacts = JSON.parse(data);
      return contacts;
    });
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    return fs.readFile(contactsPath, "utf-8").then((data) => {
      const contacts = JSON.parse(data).filter((elem) => elem.id === contactId);
      return contacts;
    });
  } catch (error) {
    console.log(error);
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
