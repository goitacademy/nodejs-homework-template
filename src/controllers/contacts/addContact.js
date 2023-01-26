const contacts = require('../../modules/contacts');

const addContact = async (request, response) => {
  const result = await contacts.addContact(request.body);
  response.status(201).json(result);
};

module.exports = addContact;
