const fs = require('fs/promises');
const path = require('path');

const contactsFilePath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    throw error;
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === contactId);
    return contact;
  } catch (error) {
    throw error;
  }
}

const removeContact = async (contactId) => {
  try {
    let contacts = await listContacts();
    contacts = contacts.filter((c) => c.id !== contactId);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return true;
  } catch (error) {
    throw error;
  }
}

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { id: generateUniqueId(), ...body };
    contacts.push(newContact);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    throw error;
  }
}

const updateContact = async (contactId, body) => {
  try {
    let contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === contactId);

    if (index === -1) {
      return null; // Not found
    }

    contacts[index] = { ...contacts[index], ...body };
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    return contacts[index];
  } catch (error) {
    throw error;
  }
}

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
