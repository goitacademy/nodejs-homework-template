const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, './contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id === contactId);
    return contactById;
  } catch (err) {
    console.log(err.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(({ id }) => id === contactId)
    if (contactToRemove !== undefined) {
      const { name } = contactToRemove;
      const newContacts = contacts.filter(({ id }) => id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
      return `${name} deleted`
    }
    return
  } catch (err) {
    console.log(err.message)
  }
};

const addContact = async (body) => {
  try {
    const { name, email, phone } = body;
    const contacts = await listContacts();
    const id = Date.now().toString();
    const newContact = { id, name, email, phone };
    if (name, email, phone) {
      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return newContact
    }
    return
  } catch (err) {
    console.log(err.message);
  }
};

const updateContact = async (contactId, updatedData) => {
  try {
    const contacts = await listContacts();
    const indexToUpdate = contacts.findIndex((contact) => contact.id === contactId);
    if (indexToUpdate === -1) {
      return
    } else {
      contacts[indexToUpdate] = { ...contacts[indexToUpdate], ...updatedData };
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return contacts[indexToUpdate];
    }
  }
  catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}