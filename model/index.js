const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'contacts.json');

const contactList = async () => {
  return JSON.parse(await fs.readFile(contactsPath));
};

const listContacts = async () => {
  try {
    const contacts = await contactList();
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await contactList();
    const contactById = contacts.find((contact) => contact.id === contactId);
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (body) => {
  try {
    const contacts = await contactList();
    const id = uuidv4();
    const newContact = { id, ...body };
    const newListContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(newListContacts));
    return newListContacts;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await contactList();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index] ? contacts : null;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await contactList();
    const contactsList = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contactsList));
    return contactsList;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
