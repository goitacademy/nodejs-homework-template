// const fs = require('fs/promises')

const fs = require('fs').promises;
const path = require('path');

const contactStorage = require('models/contacts.json')

const listContacts = async () => {
  return await contactStorage
}

const getContactById = async (contactId) => {
  try {
    const contacts = await contactStorage;
    const contact = contacts.find(u => u.id == contactId);
    return contact;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await contactStorage;
    const index = contacts.findIndex((u) => u.id == contactId);

    if (index > -1) {
      contacts.splice(index, 1);
      await writeContactsFile(contacts);
      return true;
    }
    return false;
  } catch (error) {
    console.error( error);
    throw error;
  }
};

const addContact = async (body) => {}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
