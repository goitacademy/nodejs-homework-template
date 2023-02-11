const { Contact } = require('../../schemas/modelContact');

const addContact = async body => {
  return await Contact.create(body);
};

module.exports = { addContact };
