const { Contact } = require('../schemas/contact');

const getContactById = async contactId => {
  return await Contact.findOne({ _id: contactId });
};

module.exports = { getContactById };
