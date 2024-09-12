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

const updateContact = async (id, name, phone, email) => {
  try {
    const contacts = await listContacts();
    const updatedContact = { id, name, phone, email };
    const isContactExist = contacts.filter(contact => contact.id === id);
    const updatedContacts = contacts.map(contact => contact.id === id ? updatedContact : contact)
    await fs.writeFile(dataPath, JSON.stringify(updatedContacts));
    return isContactExist;
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
