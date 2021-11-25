const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  const contactsData = await listContacts();
  return contactsData.find(contact => contact.id === Number(contactId))
};

module.exports = getContactById;