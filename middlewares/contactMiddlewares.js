const fs = require('fs').promises;

const { AppError, catchAsync, validators } = require('../utils');

/**
 * Check new contact data.
 */
exports.checkContactData = (req, res, next) => {
  // Check new contact data.
  const { error, value } = validators.createUserValidator(req.body);

  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
};

/**
 * Check contact id.
 */
exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  // check if contact ID is invalid => send 'bad request' error
  if (id.length < 10) {
     return next(new AppError(400, 'Invalid contact id.......'));
  }

  // fetch contact from DB
  const contacts = JSON.parse(await fs.readFile('./models/contacts.json'));

  const contact = contacts.find((c) => c.id === id);

  // if contact exists => validation passed
  if (contact) return next();

  // if no contact with that id, sent 'not found' request
  return next(new AppError(404, 'Contact with this id does not exist..'));
});
