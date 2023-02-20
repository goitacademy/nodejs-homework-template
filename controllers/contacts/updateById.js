const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404);
  }
  res.json(result);
};

module.exports = updateById;
