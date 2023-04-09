const fs = require('fs/promises');
const filePath = require('./filePath');
const { v4: uuidv4 } = require('uuid');

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((item) => item.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, index) => index !== contactIndex);
  await updateContact(newContacts);
  return contacts[contactIndex];
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone };
  contacts.push(newContact);
  await updateContact(contacts);
  return newContact;
};

const updateContact = async (contacts) => {
  await fs.writeFile(filePath, JSON.stringify(contacts));
};

const updateContactById = async (contactId, data) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === contactId);
  if (contactIndex === -1) {
    return null;
  }
  contacts[contactIndex] = {
    contactId,
    ...data,

  };
  await updateContact(contacts);
  return contacts[contactIndex];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
}
