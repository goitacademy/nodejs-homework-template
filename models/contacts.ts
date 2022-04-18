const DB = require("./db");
const db = new DB("contacts.json");

const listContacts = async () => {
  return await db.read();
};

// const listContacts: () => Promise<void> = async () => {
//   const contacts = JSON.parse(await fs.readFile(contactsPath));
//   return contacts;
// };

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
