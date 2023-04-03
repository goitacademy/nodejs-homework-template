const { Types } = require('mongoose');
const { AppError } = require('../utils');
const Contact = require('../models/contactsModel');

const checkUserId = async (req, res, next) => {
  const { contactId } = req.params;

  const idIsValid = Types.ObjectId.isValid(contactId);

  if (!idIsValid) return next(new AppError(404, 'User does not exist'));

  const userExists = await Contact.exists({ _id: contactId });

  if (!userExists) return next(new AppError(404, 'User does not exist'));

  next();
};

module.exports = checkUserId;
