const { contact } = require("../models");
const { ContactModel } = contact;

const getById = async (contactId) => {
  const data = await ContactModel.findById(contactId);
  return data;
};

module.exports = getById;
