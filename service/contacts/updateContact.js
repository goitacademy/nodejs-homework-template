const Contact = require('./schemas/contactsSchema');
const { validateId } = require('../../utils');

const updateContact = (id, fields) => {
  if (validateId(id)) {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
  }
  return false;
};

module.exports = updateContact;
