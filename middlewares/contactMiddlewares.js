const { Types } = require("mongoose");

const { AppError, catchAsync, contactValidators } = require("../utils");
const Contact = require("../models/contactModel");

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new AppError(404, "Contact does not exist..");

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) throw new AppError(404, "contact does not exist..");

  next();
});

exports.checkBoolean = catchAsync(async (req, res, next) => {
  const { favorite } = req.body;

  // Check if the value is boolean
  if (typeof favorite !== "boolean") {
    return res.status(400).json({ error: "The value must be boolean" });
  }

  next();
});

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidators.createContactDataValidator(
    req.body
  );

  if (error) {
    console.log(error);

    throw new AppError(400, "Invalid contact data..");
  }

  const contactExists = await Contact.exists({ email: value.email });

  if (contactExists)
    throw new AppError(409, "contact with this email exists..");

  req.body = value;

  next();
});
