const { HttpError, catchAsync, validSchemas } = require("../addoption/");
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

const resendVerifyEmail = catchAsync(async (req, res, next) => {
  const { value, error } = validSchemas.emailSchema.validate(req.body);

  if (error) throw HttpError(400, "Missing required field email");

  req.body = value;

  next();
});
module.exports = { validateBody, checkContactId, resendVerifyEmail };
