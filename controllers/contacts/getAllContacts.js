const contacts = require('../../models/contacts');

const getAllContacts = async (req, res, next) => {

  const result = await contacts.listContacts();
  res.json(result);

};

module.exports = getAllContacts;