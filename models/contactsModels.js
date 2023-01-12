const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(
  "/Users/aleksandr/nodejs-homework-rest-api/models/contacts.json"
);

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(data);
    // return JSON.parse("Hello world");
    // console.log("Hello world");
    // return data;
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
