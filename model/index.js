const fs = require("fs/promises");
const path = require("path");
// const contacts = require("./contacts.json");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const result = JSON.parse(data.toString());
  return result;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => {
    return item.id === contactId;
  });

  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1) {
    return null;
  }

  const result = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return result;
};

const addContact = async (body) => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
