const path = require('path');
const fs = require('fs').promises;
const uniqid = require('uniqid');

const contactsPath = path.join(__dirname, './contacts.json');

const getListContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await getListContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await getListContacts();
  const newList = contacts.filter((item) => item.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
  return newList;
};

const addContact = async (body) => {
  const contacts = await getListContacts();
  const { name, email, phone } = body;
  const contact = { id: uniqid(), name, email, phone };
  const newData = JSON.stringify([...contacts, contact], null, 2);
  await fs.writeFile(contactsPath, newData);
  return contact;
};

const updateContact = async (contactId, body) => {
  const contacts = await getListContacts();
  const { name, email, phone } = body;
  let updatedContact = {};

  const newContacts = contacts.map((contact) => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
      updatedContact = contact;
    }
    return contact;
  });
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return updatedContact;
};

module.exports = {
  getListContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
