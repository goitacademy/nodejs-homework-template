const Contact = require("../model/contact");

const getContactById = async (contactId) => {
  const result = await Contact.findOne({ _id: contactId });
  return result;
};

module.exports = getContactById;
