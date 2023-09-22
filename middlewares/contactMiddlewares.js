const { Types } = require('mongoose');

const Contact = require('../models/contactModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { contactDataValidator } = require('../utils/contactValidators');

exports.checkContactById = catchAsync(async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const idIsValid = Types.ObjectId.isValid(contactId);

    if (!idIsValid) throw new AppError(400, 'Bad request..');

    const contact = await Contact.findById(contactId);

    if (!contact) throw new AppError(404, 'Not found');

    req.contact = contact;

    next();
  } catch (err) {
    next(err);
  }
});

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  try {
    const { error, value } = contactDataValidator(req.body);

    if (error) throw new AppError(400, 'Invalid user data..');

    const contactExists = await Contact.exists({ email: value.email });

    if (contactExists) throw new AppError(400, 'User with this email already exists..');

    req.body = value;

    next();
  } catch (err) {
    next(err);
  }
});

exports.checkUpdateContactData = catchAsync(async (req, res, next) => {
  try {
    const { error, value } = contactDataValidator(req.body);

    if (error) throw new AppError(400, 'Invalid user data..');

    const contactExists = await Contact.findOne({ email: value.email });

    if (contactExists) throw new AppError(400, 'User with this email already exists..');

    req.body = value;

    next();
  } catch (err) {
    next(err);
  }
});