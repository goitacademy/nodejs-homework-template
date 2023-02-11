const { Contact } = require('../../schemas/modelContact');

const getContactById = async contactId => {
  return await Contact.findOne({ _id: contactId });
};

module.exports = { getContactById };
