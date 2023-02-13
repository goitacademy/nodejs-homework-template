const fs = require("fs/promises");
const { v4 } = require("uuid");

const filePath = require("./path");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  let result = {};
  typeof contactId === "number"
    ? (result = contacts.find((contact) => contact.id === contactId.toString()))
    : (result = contacts.find((contact) => contact.id === contactId));

  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  let idx = null;

  typeof contactId === "number"
    ? (idx = contacts.findIndex(
        (contact) => contact.id === contactId.toString()
      ))
    : (idx = contacts.findIndex((contact) => contact.id === contactId));

  if (idx === -1) {
    return null;
  }
  const [deletedContact] = contacts.splice(idx, 1);

  await fs.writeFile(filePath, JSON.stringify(contacts));
  return deletedContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), ...body };
  contacts.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((contact) => contact.id === id);

  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...body };

  await fs.writeFile(filePath, JSON.stringify(contacts));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
