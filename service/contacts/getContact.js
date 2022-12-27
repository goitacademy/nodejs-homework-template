const Contact = require('./schemas/contactsSchema');
const { validateId } = require('../../utils');

const getContactById = (id) => {
  if (validateId(id)) {
    return Contact.findOne({ _id: id });
  }
  return false;
};

module.exports = getContactById;
