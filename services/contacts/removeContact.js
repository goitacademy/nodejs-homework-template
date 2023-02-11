const { Contact } = require('../schemas/contact');

const removeContact = async contactId => {
  return await Contact.findByIdAndRemove({ _id: contactId });
};

module.exports = { removeContact };
