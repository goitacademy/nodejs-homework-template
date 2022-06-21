const contacts = require("../../models/contacts");
const { createError } = require("../../helpers");
const { addSchema } = require("../../schemas/contacts");

const updateById = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw createError(400);
  }

  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw createError(404);
  }

  res.json(result);
};

module.exports = updateById;
