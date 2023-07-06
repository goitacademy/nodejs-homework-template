const { Types } = require('mongoose');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Contacts = require('../models/contacts');
const { createContactValidator, favoriteValidator } = require('../utils/contactsValidators');

exports.checkContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const isIdValid = Types.ObjectId.isValid(contactId);

  if (!isIdValid) return next(new AppError(400, 'Bad request..'));

  const contact = await Contacts.findById(contactId).select('-__v');

  if (!contact)
    return res.status(404).json({
      message: 'There is no user with this id',
    });

  req.contact = contact;

  next();
});

exports.checkContactInput = catchAsync(async (req, res, next) => {
  const { error, value } = createContactValidator(req.body);

  if (error) return next(new AppError(400, 'Invalid contact data'));

  const userExists = await Contacts.exists({ email: value.email });

  if (userExists) return next(new AppError(400, 'User with this email already exists'));

  req.body = value;

  next();
});

exports.checkFavoriteInput = catchAsync(async (req, res, next) => {
  const { error, value } = favoriteValidator(req.body);
  console.log();

  if (error) return next(new AppError(400, error.message));

  req.body = value;

  next();
});
