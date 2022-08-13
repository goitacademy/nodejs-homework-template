const contactOperations = require("../../models/contacts");

const getAll = async (_, res) => {
  const result = await contactOperations.getAllContacts();
  res.json(result);
};

module.exports = getAll;
