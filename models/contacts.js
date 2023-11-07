const fs = require('fs').promises;
// const shortid = require('shortid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    throw error;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
  } catch (error) {
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return true;
  } catch (error) {
    throw error;
  }
};

const addContact = async (body) => {
  try {
    const newContact = { id: shortid.generate(), ...body };
    const contacts = await listContacts();
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, ...body } : contact
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return updatedContacts.find((contact) => contact.id === contactId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
