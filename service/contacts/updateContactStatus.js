const Contact = require('./schemas/contactsSchema');
const { validateId } = require('../../utils');

const updateContactStatus = (id, { favorite }) => {
  if (validateId(id)) {
    return Contact.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });
  }
  return false;
};

module.exports = updateContactStatus;
