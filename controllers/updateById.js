const contacts = require("../models/contacts");
const { RequestError } = require("../helpers");
const contactSchema = require("../schemas/contact");

const update = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  if (!req.body) {
    throw RequestError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = update;
