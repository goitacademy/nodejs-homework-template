const { readFile } = require("fs/promises");
const path = require("path");

const baseDir = __dirname;
const fileName = "contacts.json";
const contactsPath = path.join(baseDir, fileName);

const contactsArray = () => {
  return readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch((error) => console.log(error.message));
};

const listContacts = async () => {
  try {
    const contacts = await contactsArray();
    return contacts;
  } catch (error) {
    console.log(error.message);
    throw error;
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
