const contacts = require("../../models/contacts.js");
const { RequestError } = require("../../utils/index");

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = updateContactById;
