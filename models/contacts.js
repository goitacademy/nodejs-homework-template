// const { nanoid } = require("nanoid");
const path = require("path");
const { FSOperationsHelper } = require("@root/helpers");

//JSON.stringify(contacts, null, 2)
const pathToContactsDB = path.join(__dirname, "contactsDB.json");
FSOperationsHelper.init(pathToContactsDB);

const listContacts = async () => {
  const contactsData = await FSOperationsHelper.readData();

  return JSON.parse(contactsData);
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
