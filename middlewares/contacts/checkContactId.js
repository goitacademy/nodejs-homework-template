// ./midlewares/contacts/checkContactId.js

const { Types } = require('mongoose');
const { AppError, catchAsync } = require('../../utils');
const services = require('../../services/contacts');

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) throw new AppError(404, 'Contact does not exist..');

  const contactExists = await services.checkContactExists({ _id: id });

  if (!contactExists) throw new AppError(404, 'contact does not exist..');

  next();
});
