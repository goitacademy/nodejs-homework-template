const { Contacts } = require('../../models/contacts');
const { createReject } = require('../../utils');

const contactRemove = async contactId => {
  const result = await Contacts.findByIdAndRemove(contactId);
  if (!result) {
    throw createReject(404, 'Not found');
  }
};

module.exports = contactRemove;