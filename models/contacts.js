const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./models/contacts.json');

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(contacts);
  } catch (error) {
    throw error;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(({ id }) => id === contactId.toString());
    return contact ? contact : 0;
  } catch (erorr) {
    throw erorr;
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(({ id }) => {
      return id === contactId.toString();
    });
    if (index === -1) {
      return 0;
    }
    const removedContacts = contacts.splice(index, 1);
    const data = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, data, 'utf-8');
    return removedContacts[0];
  } catch (erorr) {
    throw erorr;
  }
}

async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) {
      return `Fail parameters: name, email, phone`;
    }

    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    const contacts = await listContacts();
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts), 'utf-8');
    return newContact;
  } catch (erorr) {
    throw erorr;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
