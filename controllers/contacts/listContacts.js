const contactOperations = require("../../models/contacts");

const listContacts = async (req, res) => {
  const result = await contactOperations.listContacts();
  res.json(result);
};

module.exports = listContacts;
