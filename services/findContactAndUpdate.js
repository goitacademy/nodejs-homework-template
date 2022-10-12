const { Contacts } = require('../models/contacts');
const { createReject } = require('../utils');

const findContactAndUpdate = async (contactId, body) => {
  const result = await Contacts.findByIdAndUpdate(contactId, body);
  if (!result) {
    throw createReject(404, 'Not found');
  }

  return { ...result._doc, ...body };
};

module.exports = findContactAndUpdate;
