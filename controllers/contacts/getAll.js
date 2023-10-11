const contacts = require('../../models/contacts');

const getAll = async (req, res) => {
  res.json(await contacts.getAllContacts());
};

module.exports = getAll;
