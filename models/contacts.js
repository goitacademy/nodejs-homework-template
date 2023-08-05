const fs = require('fs').promises;

const contactsPath = require('./contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath)
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.log(err.message);
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(({ id }) => id === contactId)
    if (contactById !== undefined) {
      return contactById;
    } else {
      return `Contact with the provided ID was not found.`.bgYellow
    }
  } catch (err) {
    console.log(err.message);
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactToRemove = contacts.find(({ id }) => id === contactId)
    if (contactToRemove !== undefined) {
      const { name } = contactToRemove;
      const newContacts = contacts.filter(({ id }) => id !== contactId);
      fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
      return `${name} has been removed.`.bgYellow
    } else {
      return `Contact with the provided ID was not found.`.bgYellow
    }
  } catch (err) {
    console.log(err.message)
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const id = Date.now().toString();
    const newContact = { id, name, email, phone };
    if (name, email, phone) {
      contacts.push(newContact);
      fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return `${name} has been added.`.bgYellow
    } else {
      return `Not enough data.`.bgYellow
    }
  } catch (err) {
    console.log(err.message);
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
