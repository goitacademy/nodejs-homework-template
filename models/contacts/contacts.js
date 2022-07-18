const fs = require('fs/promises');
const { resourceLimits } = require('worker_threads');
const contactsPath = require('./contactsPath');


const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  if (!data) {
    return null;
  }
  const result = JSON.parse(data);
  return result;
}

const getContactById = async (contactId) => { }

const removeContact = async (contactId) => { }

const addContact = async (body) => { }

const updateContact = async (contactId, body) => { }

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
