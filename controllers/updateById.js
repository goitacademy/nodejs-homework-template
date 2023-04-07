const createError = require("../helpers/createError");
const { updateContactById } = require("../models/contacts");
const { addSchema } = require("../middleware/validation");

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;

  const { error } = addSchema.validate(body);
  if (error) {
    throw createError(400, error.message);
  }

  const result = await updateContactById(contactId, body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;
