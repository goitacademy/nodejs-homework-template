const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const pathToContact = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(pathToContact);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((i) => i.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const listOfContacts = await listContacts();
  const index = listOfContacts.findIndex((i) => i.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = listOfContacts.splice(index, 1);
  await fs.writeFile(pathToContact, JSON.stringify(listOfContacts, null, 2));
  return result;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(pathToContact, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((i) => i.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id: contactId, ...body };
  await fs.writeFile(pathToContact, JSON.stringify(contacts, null, 2));
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
