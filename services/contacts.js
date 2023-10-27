const fs = require('fs').promises;
const path = require('path');

const pathContacts = path.join(__dirname, '../models/contacts.json');

const listAllContacts = async () => {
  try {
    const result = (await fs.readFile(pathContacts)).toString();
    return JSON.parse(result);
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async contactId => {
  try {
    const result = await JSON.parse(
      (await fs.readFile(pathContacts)).toString(),
    );
    for (contact of result) {
      if (contact.contactId == contactId) {
        return contact;
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const addContact = async body => {};

const updateContact = async (contactId, body) => {};

const removeContact = async contactId => {};

module.exports = {
  listAllContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
