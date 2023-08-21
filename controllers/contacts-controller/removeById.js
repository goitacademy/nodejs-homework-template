const { Contact } = require("../../models/contacts");
const asyncHandler = require("express-async-handler");

const removeById = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
  }
  res.json({
    message: "contact deleted",
  });
});

module.exports = removeById;
