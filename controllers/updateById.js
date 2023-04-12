const contacts = require("../models/contacts");
const httpError = require("../helpers/httpError");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw httpError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateById;
