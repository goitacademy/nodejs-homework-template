const contactsModel = require("../models/contacts");

const add = async (contactBody) => {
  const data = await contactsModel.addContact(contactBody);
  return data;
};

module.exports = add;
