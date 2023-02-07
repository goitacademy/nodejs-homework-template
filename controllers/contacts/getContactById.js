const { Contact } = require('../../models/contact');

const getContactById = async contactId => {
  const data = await listContacts();
  const result = data.find(contact => contact.id === String(contactId));
  return result;
};


module.exports = getContactById;