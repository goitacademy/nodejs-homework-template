const contactsModel = require("../models/contacts");

const remove = async (contactId) => {
  const data = await contactsModel.removeContact(contactId);
  return data;
};

module.exports = remove;
