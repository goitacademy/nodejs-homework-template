const fs = require('fs/promises');
const path = require('path');
const { v4 } = require('uuid');

// const contactsPath = require('./contacts.json');
const contactsPath = path.join('model/contacts.json');

const updateContacts = async contacts => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
};

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(contacts);
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const findContactId = contacts.find(c => c.id === Number(contactId));
    if (!findContactId) {
      return null;
    }
    return findContactId;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContactById = async id => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
      return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await updateContacts(newContacts);
    return contacts[idx];
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async data => {
  try {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...data };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContactById = async (id, data) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === Number(id));
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...data };
  await updateContacts(contacts);
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
