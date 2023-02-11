const { Contact } = require('../schemas/contact');

const addContact = async body => {
  return await Contact.create(body);
};

module.exports = { addContact };
