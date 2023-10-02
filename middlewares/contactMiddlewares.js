const { Types } = require('mongoose');

const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { contactDataValidator} = require('../utils/contactValidators');


exports.checkContactById = catchAsync(async (req, res, next) => {

  const { contactId } = req.params;

  const idIsValid = Types.ObjectId.isValid(contactId);

  if (!idIsValid) return next(new AppError(400, 'Bad request..'));

  const contact = await Contact.findById(contactId);

  if (!contact) return next(new AppError(404, 'Not found'));

  req.contact = contact;

  next();
});



exports.checkCreateContactData = catchAsync(async (req, res, next) => {

  const { error, value } = contactDataValidator(req.body);

  if (error) return next(new AppError(400, 'Invalid user data..'));

  const contactExists = await Contact.exists({ email: value.email });

  if (contactExists) return next(new AppError(400, 'User with this email already exists..'));

  req.body = value;

  next();
});



exports.checkUpdateContactData = catchAsync(async (req, res, next) => {

  const { error, value } = contactDataValidator(req.body);

  if (error) return next(new AppError(400, 'Invalid user data..'));
  
  const contactExists = await Contact.findOne({ email: value.email });

  if (contactExists) return next(new AppError(400, 'User with this email already exists..'));

  req.body = value;

  next();
});