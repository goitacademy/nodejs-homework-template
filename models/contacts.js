const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

const contactPath = require("./contactPath");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);

  const contacts = JSON.parse(data);
  console.log(contacts);
  return contacts;
};

console.log(listContacts());

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const filteredContacts = contacts.find((contact) => contact.id === contactId);

  if (filteredContacts.length === 0) return null;

  return filteredContacts;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) return null;

  const [removeContact] = contacts.splice(index, 1);
  await updateContact(contacts);
  return removeContact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: uuidv4() };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};

const updateContactById = async (id, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) return null;

  contacts[index] = { ...body, id };
  await updateContact(contacts);
  return contacts[index];
};

const updateContact = async (data) => {
  await fs.writeFile(contactPath, JSON.stringify(data));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
  updateContact,
};
