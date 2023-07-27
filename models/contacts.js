const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

// const fs = require('fs/promises')

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const foundContact = contacts.find(item => item.id === contactId);
  return foundContact ? foundContact : null;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  } else {
    const foundContact = contacts[index];
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return foundContact;
  }
};

const addContact = async contact => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...contact,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, contact) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === contactId);
  if (index === -1) {
    return null;
  } else {
    let foundContact = {
      id: contactId,
      ...contact,
    };
    contacts[index] = foundContact;
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return foundContact;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
