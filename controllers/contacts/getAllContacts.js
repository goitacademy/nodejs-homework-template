const { listContacts } = require('../../models/contacts');

const getAllContacts = async (req, res, next) => {
  const contacts = await listContacts();

  res.json(contacts);
};

module.exports = getAllContacts;