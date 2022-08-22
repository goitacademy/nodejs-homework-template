const { Contact, schemas } = require("../../models/contacts");
const { createError } = require("../../helpers");
const { isValidObjectId } = require("mongoose");

const updateById = async (req, res) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const { id } = req.params;
  const isValid = isValidObjectId(id);
  if (!isValid) {
    throw createError(404);
  }
  const result = await Contact.findByIdAndUpdate(id, req.body);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateById;
