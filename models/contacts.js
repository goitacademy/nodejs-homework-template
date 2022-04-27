const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { contactsPath } = require("../helpers/index");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  if (!data) {
    return null;
  }
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();
  const result = data.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const data = await listContacts();
  const deletedContact = await getContactById(contactId);
  if (!deletedContact) {
    return null;
  }
  const result = data.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(result));
  return deletedContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = { id: nanoid(), name, email, phone };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
