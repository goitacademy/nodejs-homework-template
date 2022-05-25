const fs = require("fs/promises");
const path = require("path");
const pathContacts = path.join(__dirname, "contacts.json");
const { v4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(pathContacts);
  const allContacts = JSON.parse(data);
  return allContacts;
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
  const allContacts = await listContacts();
  const index = allContacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = allContacts.splice(index, 1);
  await fs.writeFile(pathContacts, JSON.stringify(allContacts));
  return removeContact;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContacts = { id: v4(), ...body };
  allContacts.push(newContacts);
  await fs.writeFile(pathContacts, JSON.stringify(allContacts));
  return newContacts;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { ...body, id: contactId };
  await fs.writeFile(pathContacts, JSON.stringify(contacts));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
