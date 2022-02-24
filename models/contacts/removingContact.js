const Contact = require('../../service/schemaContact');

const removingContact = async contactId => {
  return Contact.findByIdAndRemove({ _id: contactId });
};

module.exports = removingContact;
