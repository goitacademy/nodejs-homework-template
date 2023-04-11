const httpError = require("../helpers/httpError");
const contacts = require("../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;
