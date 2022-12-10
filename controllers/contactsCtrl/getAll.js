const contacts = require("../../models/contactsModels");

const getAll = async (req, res, next) => {
  const result = await contacts.getAllContacts();

  res.json(result);
};

module.exports = getAll;
