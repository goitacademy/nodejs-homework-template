const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");


const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, data) => {
  const contacts = await listContacts();
  const id = await contacts.findIndex((contact) => contact.id === contactId);

  if (id === -1) {
    return null;
  }
  contacts[id] = { id: contactId, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

  return contacts[id];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
