const contacts = require("../../models/contacts");

const { RequestError } = require("../../helpers");

const { contactsSchema } = require("../../schemas/contacts");

const update = async (req, res) => {
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "missing required name field");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = update;
