const fs = require("fs/promises");
const path = require("path");

const contactsPath = require("./contactsPatch");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => String(contact.id) === String(id));
  if (!result) {
    return null;
  }

  return result;
};

const removeContact = async (id) => {};

const addContact = async (body) => {};

const updateContact = async (id, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
