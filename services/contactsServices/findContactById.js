const { Contacts } = require('../../models/contacts');
const { createReject } = require('../../utils');

const findContactById = async contactId => {
  const result = await Contacts.findById(contactId);
  if (!result) {
    throw createReject(404, 'Not found');
  }
  return result;
};

module.exports = findContactById;
