const { Contact } = require("../../models/contacts");
const asyncHandler = require("express-async-handler");

const getById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json(result);
});

module.exports = getById;
