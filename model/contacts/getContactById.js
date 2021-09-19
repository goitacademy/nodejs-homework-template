/* eslint-disable no-useless-catch */
const listContacts = require('./listContacts');

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const selectContact = contacts.find(item => item.id === Number(contactId));
    if (!selectContact) {
      return null;
    }
    // console.table(selectContact);
    return selectContact;
  } catch (error) {
    throw error;
  }
};

module.exports = getContactById;
