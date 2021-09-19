/* eslint-disable no-useless-catch */
const updateContacts = require('./updateContacts');
const listContacts = require('./listContacts');
// const filePath = require("./filePath");

const removeContact = async contactId => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === Number(contactId));
    if (idx === -1) {
      throw new Error(`Contact with id ${contactId} not found`);
    }
    const delContact = contacts.filter(item => item.id !== contactId);
    await updateContacts(delContact);
    console.table(contacts[idx]);
    return contacts[idx];
  } catch (error) {
    throw error;
  }
};

module.exports = removeContact;
