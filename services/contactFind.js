const { Contacts } = require('../models/contacts');
const { createReject } = require('../utils');

const contactFind = async contactId => {
  const result = await Contacts.findById(contactId);
  if (!result) {
    throw createReject(404, 'Not found');
  }
  return result;
};

module.exports = contactFind;