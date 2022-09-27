const contacts = require('../../models/contacts');

const getAllContacts = async (_, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

module.exports = getAllContacts;
