const contactOperation = require("../../models/contacts");

const getAll = async (req, res, next) => {
  const contacts = await contactOperation.listContacts();
  res.json(contacts);
};

module.exports = getAll;
