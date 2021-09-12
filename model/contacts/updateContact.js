/* eslint-disable no-useless-catch */
const updateContacts = require('./updateContacts');
const listContacts = require('./listContacts');

const updateContact = async (contactId, updateInfo) => {
  try {
    const contacts = await listContacts();
    const updateContactIndex = contacts.findIndex(
      contact => contact.id === contactId,
    );
    if (updateContactIndex === -1) {
      return null;
    }
    contacts[updateContactIndex] = {
      ...contacts[updateContactIndex],
      ...updateInfo,
    };
    await updateContacts(contacts);
    return contacts[updateContactIndex];
  } catch (error) {
    throw error;
  }
};

module.exports = updateContact;
