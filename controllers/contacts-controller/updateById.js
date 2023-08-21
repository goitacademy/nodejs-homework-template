const { Contact } = require("../../models/contacts");
const { schemas } = require("../../schemas/contacts");
const asyncHandler = require("express-async-handler");

const updateById = asyncHandler(async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(result);
});

module.exports = updateById;
