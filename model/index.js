const { randomUUID } = require('crypto');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (e) {
    console.log(e);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(el => el.id === contactId);
    return contact;
  } catch (e) {
    console.log(e);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const newList = contacts.filter(el => el.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
    return contacts[idx];
  } catch (e) {
    console.log(e);
  }
};

const addContact = async body => {
  try {
    const contacts = await listContacts();

    const newContact = { ...body, id: randomUUID() };
    const newList = [...contacts, newContact];
    console.log(newList);
    await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2));
    return newContact;
  } catch (e) {
    console.log(e);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    const updatedContact = { ...contacts[idx], ...body };
    contacts[idx] = updatedContact;

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return updatedContact;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
