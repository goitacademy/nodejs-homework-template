const { Contacts } = require('../models/contacts');
const { createReject } = require('../utils');

const createContact = async ({ name, phone, email }) => {
  if (!name || !phone || !email) {
    throw createReject(400, 'Missing required name field');
  }
  return await Contacts.create({ name, phone, email });
};

module.exports = createContact;
