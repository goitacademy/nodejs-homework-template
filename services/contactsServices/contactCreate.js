const { Contacts } = require('../../models/contacts');
const { createReject } = require('../../utils');

const contactCreate = async contact => {
  if (!contact.name || !contact.phone || !contact.email) {
    throw createReject(400, 'Missing required name field');
  }
  return await Contacts.create(contact);
};

module.exports = contactCreate;