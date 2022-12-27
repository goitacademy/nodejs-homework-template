const Contact = require('./schemas/contactsSchema');
const { validateId } = require('../../utils');

const removeContact = (id) => {
  if (validateId(id)) {
    return Contact.findByIdAndDelete({ _id: id });
  }
  return false;
};

module.exports = removeContact;
