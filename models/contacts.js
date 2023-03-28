const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    const newContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[idx];
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const addContact = async body => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: randomUUID(),
      ...body,
    };
    const contactsAll = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(contactsAll));
    return newContact;
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
      return null;
    }
    contacts[idx] = {id: contactId, ...body, };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[idx];
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
