const Contact = require("../../model");

const getById = async (contactId) => {
  const result = await Contact.findById(contactId);
  return result;
};
module.exports = getById;
