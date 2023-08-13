const fs = require('fs/promises');
const Joi = require('joi');

const contactsFilePath = './models/contacts.json';

const listContacts = async () => {
  const data = await fs.readFile(contactsFilePath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const updateContacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsFilePath, JSON.stringify(updateContacts, null, 2));
};

const addContact = async (body) => {
  const contacts = await listContacts();
  const newContact = { ...body, id: Date.now().toString() };
  contacts.push(newContact);
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contacts[index], ...body };
  contacts[index] = updateContact;
  await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));

  return updateContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
