const Contact = require('./schemas/contactsSchema');

const createContact = ({ name, email, phone }) => {
  return Contact.create({ name, email, phone });
};

module.exports = createContact;
