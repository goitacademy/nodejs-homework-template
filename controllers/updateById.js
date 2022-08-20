const contacts = require("../models/contacts");
const { RequestError } = require("../helpers");

const updateById = async (req, res) => {
  const body = req.body;
  if (!body) {
    throw RequestError(400, "missing fields");
  }

  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, body);
  if (!result) {
    throw RequestError(404, "Not found");
  }

  res.json(result);
};

module.exports = updateById;
