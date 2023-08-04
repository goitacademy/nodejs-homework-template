const fs = require('fs/promises')
const dataPath = './models/contacts.json';

const listContacts = async () => {
  try {
    const data = await fs.readFile(dataPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter(contact => JSON.stringify(contact.id) === JSON.stringify(contactId));
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (id, name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id, name, email, phone };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(dataPath, JSON.stringify(newContacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const removedContact = contacts.filter(contact => JSON.stringify(contact.id) === JSON.stringify(contactId));
    const filteredContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(dataPath, JSON.stringify(filteredContacts));
    return removedContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactToUpdate = contacts.filter(contact => contact.id === contactId);
    const updatedContact = { ...contactToUpdate };
    console.log(updatedContact);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
