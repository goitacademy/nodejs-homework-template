const listContacts = require('./listContacts');

const getContactById = async contactId => {
  try {
    const contacts = await listContacts();
    const findContactId = contacts.find(c => c.id == contactId);
    if (!findContactId) {
      return null;
    }
    return findContactId;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getContactById;
