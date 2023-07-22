// ./midlewares/contacts/checkContactId.js

const { Types } = require('mongoose');
const { AppError, catchAsync } = require('../../utils');
const { Contact } = require('../../models');

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new AppError(404, 'Contact does not exist..');

  const contactExists = await Contact.exists({ _id: id });

  if (!contactExists) throw new AppError(404, 'contact does not exist..');

  next();
});
