const fs = require('fs').promises;
const uniqid = require('uniqid');
const path = require('path');
// const contactsPath = path.resolve('./model/contacts.json');
const contactsPath = path.join(__dirname, './contacts.json');
const { trimData } = require('../utils/utils');

const listContacts = async () => {
  return await fs.readFile(contactsPath, 'utf8');
};

const parsedContacts = async () => {
  const contacts = await listContacts(contactsPath, 'utf8');
  return JSON.parse(contacts);
};

const getContactById = async contactId => {
  const contacts = await parsedContacts();

  const res = contacts.find(({ id }) => id == contactId);
  if (!res) return null;
  return res;
};

const removeContact = async dataId => {
  const contacts = await parsedContacts();
  const contact = contacts.find(({ id }) => String(id) === String(dataId));

  const updatedContacts = contacts.filter(({ id }) => String(id) !== String(dataId));
  const data = JSON.stringify(updatedContacts);

  fs.writeFile(contactsPath, data);

  return contact;
};

const addContact = async body => {
  let contacts = await parsedContacts();
  trimData(body);
  body.id = uniqid();

  contacts = [...contacts, body];
  const data = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, data);
  return body;
};

const updateContact = async (contactId, body) => {
  const contacts = await parsedContacts();
  const data = [];
  let foundContact = null;
  trimData(body);

  contacts.forEach(contact => {
    if (contact.id == contactId) {
      foundContact = { ...contact, ...body };
      data.push(foundContact);
    } else {
      data.push(contact);
    }
  });

  const updatedContacts = JSON.stringify(data);
  fs.writeFile(contactsPath, updatedContacts);

  return foundContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
