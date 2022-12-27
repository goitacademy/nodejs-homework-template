const Contact = require('./schemas/contactsSchema');

const getAllContacts = async () => {
  return Contact.find();
};

module.exports = getAllContacts;
