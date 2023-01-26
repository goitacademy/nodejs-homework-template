const contacts = require('../../modules/contacts');

const listContacts = async (request, response) => {
  const result = await contacts.listContacts()
  response.json(result)
};

module.exports = listContacts
