const {
  Types: { ObjectId },
} = require("mongoose");
const AppError = require("../utils/appError");
const { catchAsync, contactValidator } = require("../utils");
const Contact = require("../models/contactsModel");

// todo check the function, causes an error
const checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
});

const checkSameContact = catchAsync(async (req, res, next) => {
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

const checkContactId = catchAsync(async (req, res, next) => {
  const id = req.params.contactId.toString();

  if (!ObjectId.isValid(id)) {
    return next(new AppError(400, "Invalid contact id.."));
  }

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) return next(new AppError(404, "Contact not found.."));

  next();
});

module.exports = {
  checkSameContact,
  checkContactId,
  checkCreateContactData,
};
