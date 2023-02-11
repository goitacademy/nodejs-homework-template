const { Contact } = require('../../schemas/modelContact');

const removeContact = async contactId => {
  return await Contact.findByIdAndRemove({ _id: contactId });
};

module.exports = { removeContact };
