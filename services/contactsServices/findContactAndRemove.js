const { Contacts } = require('../../models/contacts');
const { createReject } = require('../../utils');

const findContactAndRemove = async contactId => {
  const result = await Contacts.findByIdAndRemove(contactId);
  if (!result) {
    throw createReject(404, 'Not found');
  }
};

module.exports = findContactAndRemove;
