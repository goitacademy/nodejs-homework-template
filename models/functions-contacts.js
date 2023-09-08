const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const data = await listContacts();

  const result = await data.filter((contact) => contact.id === contactId);

  return result.length > 0 ? result : null;
};

const removeContact = async (contactId) => {
  const data = await listContacts();

  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const deletedContact = data.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return deletedContact;
};

const addContact = async ({ name, email, phone }) => {
  const data = await listContacts();

  const newContact = { id: nanoid(), name, email, phone };

  const newData = [...data, newContact];

  await fs.writeFile(contactsPath, JSON.stringify(newData, null, 2));

  return newContact;
};

const updateContact = async (contactId, { name, email, phone }) => {
  const data = await listContacts();
  const index = data.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const newContact = { id: contactId, name, email, phone };

  data.splice(index, 1, newContact);

  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
