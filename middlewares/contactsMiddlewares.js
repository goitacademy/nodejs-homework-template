const {
  Types: { ObjectId },
} = require("mongoose");
const AppError = require("../utils/appError");
const { catchAsync, contactValidator } = require("../utils");
const Contact = require("../models/contactsModel");

// todo check the function, causes an error
exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
});

exports.checkSameContact = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (
    (await Contact.exists({ name: name })) ||
    (await Contact.exists({ email: email })) ||
    (await Contact.exists({ phone: phone }))
  ) {
    return next(new AppError(400, "contact already exists"));
  }

  next();
});

exports.checkContactId = catchAsync(async (req, res, next) => {
  const id = req.params.contactId.toString();

  if (!ObjectId.isValid(id)) {
    return next(new AppError(400, "Invalid contact id.."));
  }

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) return next(new AppError(404, "Contact not found.."));

  next();
});

exports.checkStatusContactBody = catchAsync(async (req, res, next) => {
  const { favorite } = req.body;

  console.log("==========CHECK=STAUS===========");
  console.log(typeof favorite);

  if (favorite === undefined)
    return next(new AppError(400, "missing body field favorite "));

  next();
});
