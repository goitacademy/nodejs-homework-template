const getAllContacts = require('../../model/contacts/getAllContacts');

const getContactById = async contactId => {
  const contacts = await getAllContacts();

  const contact = contacts.find(
    item => parseInt(item.id) === parseInt(contactId),
  );

  if (!contact) {
    return null;
  }
  return contact;
};

module.exports = getContactById;
