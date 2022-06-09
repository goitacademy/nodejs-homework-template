const contacts = require("../../models");

const getById = async (req, res) => {
  const { contactId } = req.params;

  const result = await contacts.getContactById(contactId);
  res.json(result);
};

module.exports = getById;
