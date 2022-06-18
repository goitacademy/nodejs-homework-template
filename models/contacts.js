const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactToRemove =
    contacts[contacts.findIndex((contact) => contact.id === contactId)];
  console.log(contactToRemove);
  const newContacts = contacts.filter(({ id }) => id !== contactId);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contactToRemove;
  } catch (err) {
    console.log(err.message);
  }
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const contacts = await listContacts();
  const newContact = { id: uuid.v1(), name, email, phone };
  const newContacts = [...contacts, newContact];
  try {
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return newContact;
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idToUpdate = contacts.findIndex((contact) => contact.id === contactId);
  if (idToUpdate === -1) {
    return null;
  }
  const { name, email, phone } = body;
  contacts[idToUpdate] = { id: contactId, name, email, phone };
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idToUpdate];
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
