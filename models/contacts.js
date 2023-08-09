const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((el) => el.id === contactId);
  return contact ? contact : null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const newListOfContacts = contacts.filter((el) => el.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newListOfContacts, null, 2));
  return newListOfContacts;
};

const addContact = async (body) => {
  const newContact = {id: nanoid(), ...body};
  const contacts = await listContacts();
  const newListOfContacts = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newListOfContacts, null, 2));
  return newListOfContacts;
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const indexToUpdate = contacts.findIndex((el) => el.id === contactId);
  if (indexToUpdate === -1) {
    return null;
  } else {
  const updatedContact = { ...contacts[indexToUpdate], ...body };
  contacts[indexToUpdate] = updatedContact;
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return updatedContact;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
