const fs = require('fs').promises;

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.checkContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  if (contactId.length < 10) return next(new AppError(400, 'Bad request..'));

  const contacts = JSON.parse(await fs.readFile('./models/contacts.json'));

  const index = contacts.findIndex(item => item.id === contactId);
  const contact = contacts[index];

  if (!contact || index === -1) return next(new AppError(404, 'User does not exist..'));

  req.contact = contact;
  req.index = index;
  req.contacts = contacts;
  next();
});
