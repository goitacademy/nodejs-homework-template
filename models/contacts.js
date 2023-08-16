const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
// const contactsList = require("./contacts.json");
const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const [contact] = contacts.filter(({ id }) => contactId === id);
  return contact;
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const deletedContact = contacts.filter(({ id }) => contactId !== id);

  if (deletedContact.length !== contacts.length) {
    await fs.writeFile(contactsPath, JSON.stringify(deletedContact, null, 2));
    return true;
  }
  return false;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const findContactIndex = contacts.findIndex(({ id }) => id === contactId);
  if (findContactIndex === -1) {
    return false;
  }
  const changedContact = { ...contacts[findContactIndex], ...body };
  contacts.splice(findContactIndex, 0, changedContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return changedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
