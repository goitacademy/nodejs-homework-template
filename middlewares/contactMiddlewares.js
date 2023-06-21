const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { Types } = require('mongoose');
const { createContactValidator, updateContactValidator } = require('../utils/contactValidator');

const checkContactById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) return next(new AppError(400, 'Bad request..'));

  const contact = await Contact.findById(id);

  if (!contact) return next(new AppError(404, 'Contact does not exist..'));

  req.contact = contact;

  next();
});

const checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = createContactValidator(req.body);

  if (error) return next(new AppError(400, 'Invalid contact data..'));

  const contactExists = await Contact.exists({ email: value.email });

  if (contactExists) return next(new AppError(400, 'Contact with this email already exists..'));

  req.body = value;

  next();
});

module.exports = {
  checkContactById,
  checkCreateContactData
}