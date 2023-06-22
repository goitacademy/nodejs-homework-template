const contacts = require("../../models/contacts.js");
const { requestError } = require("../../utils/index.js");

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateContactById;
