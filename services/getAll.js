const contactsModel = require("../models/contacts");

const getAll = async () => {
  const data = await contactsModel.listContacts();
  return data;
};
module.exports = getAll;
