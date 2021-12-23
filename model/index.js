const fs = require("fs/promises");
// const contacts = require("./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile("./model/contacts.json");
  const result = JSON.parse(data.toString());
  return result;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => {
    return item.id === contactId;
  });
  return result;
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
