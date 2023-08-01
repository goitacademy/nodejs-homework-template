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
    const contact = contacts.filter(contact => contact.id === contactId);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const filteredContacts = contacts.filter(contact => contact.id !== contactId);
    await fs.writeFile(dataPath, JSON.stringify(filteredContacts));
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: Math.floor(Math.random() * 100), name, email, phone };
    const newContacts = [...contacts, newContact];
    await fs.writeFile(dataPath, JSON.stringify(newContacts));
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactToUpdate = contacts.filter(contact => contact.id === contactId);
    const updatedContact = { ...contactToUpdate};
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
