const { contactsSchema } = require("../../schemas");
const { HttpError } = require("../../helpers");
const asyncHandler = require("express-async-handler");
const { ContactServices } = require("../../services");

const updateContact = asyncHandler(async (req, res, next) => {
  const { contactId } = req.params;
  const { error } = contactsSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const result = await ContactServices.update(contactId, req.body);
  if (!result) {
    throw HttpError(404, `not found`);
  }
  res.json({ status: 200, message: "success", data: result });
});

module.exports = updateContact;
