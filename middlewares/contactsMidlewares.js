const { Types } = require("mongoose");

const { AppError, catchAsync, contactsValidators } = require("../utils");
const Contact = require("../models/contactsModel");

/**
 * Check user exists in db by id middleware.
 */
exports.checkContactById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new AppError(400, "Contact does not exist..");

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) throw new AppError(400, "Contact does not exist..");

  next();
});

exports.checkCreateContactById = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.createContactDataValidator(
    req.body
  );

  if (error) {
    console.log(error);

    throw new AppError(400, "Invalid contact data..");
  }

  const contactExists = await Contact.exists({ email: value.email });

  if (contactExists)
    throw new AppError(409, "Contact with this email exists..");

  req.body = value;

  next();
});

exports.checkUpdateContactById = catchAsync(async (req, res, next) => {
  const { error, value } = contactsValidators.createContactDataValidator(
    req.body
  );

if (error) {
  console.log(error);

  throw new AppError(400, "Invalid contact data..");
}

const contactExists = await Contact.exists({ email: value.email });

if (contactExists)
  throw new AppError(409, "Contact with this email exists..");

req.body = value;

next();
});
