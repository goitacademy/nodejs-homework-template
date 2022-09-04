const contacts = require('../../models/contacts');

const getContactsList = async (_, res) => {
  const result = await contacts.getContactsList();
  res.json(result);
};

module.exports = getContactsList;
