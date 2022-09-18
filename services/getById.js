const contactsModel = require("../models/contacts");

const getById = async (contactId) => {
  const data = await contactsModel.getContactById(contactId);
  return data;
};

module.exports = getById;
