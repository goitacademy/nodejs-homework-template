const { RequestError } = require("../../helpers");
const contacts = require("../../models/contacts");
const { updateSchema } = require("../../schema/contacts");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = updateSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateById;
