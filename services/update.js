const contactsModel = require("../models/contacts");

const update = async (contactId, contactBody) => {
  const data = await contactsModel.updateContact(contactId, contactBody);
  return data;
};

module.exports = update;
