const { HttpError, catchAsync } = require("../addoption/");
const { Types } = require("mongoose");
const { Contact } = require("../models");

const { schema: contactSchema } = require("../validation/schema");

const validateBody = catchAsync(async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) throw HttpError(400, error.message);
  next();
});

const checkContactId = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const idIsValid = Types.ObjectId.isValid(contactId);

  if (!idIsValid) throw HttpError(404, "User not found..");

  const userExists = await Contact.exists({ _id: contactId });

  if (!userExists) throw HttpError(404, "User not found..");

  next();
});

module.exports = { validateBody, checkContactId };
