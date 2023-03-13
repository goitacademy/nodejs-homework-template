const fs = require('fs').promises;
const { validators } = require('../utils');
/*
 * Check new contact data.
 */
const checkContactData = (req, res, next) => {
  const { err, value } = validators.modules.createContactValidator(req.body);

  if (err) {
    const error = new Error('Invalid user data.');

    error.status = 400;
    return next(error);
  }

  req.body = value;

  next();
};
/*
 * Check contact id.
 */
const checkContactId = async (req, res, next) => {
  try {
    const { err, id } = validators.modules.updateContactValidateByID(req.params);
    if (err) {
      const error = new Error('Invalid ID parameter. ');

      error.status = 404;
      return next(error);
    }
    const contacts = JSON.parse(await fs.readFile('../models/contacts.json'));

    const contact = contacts.find((item) => item.id === id);
    if (contact) return next();

    const error = new Error('Not Found');
    error.status = 404;
    next(error);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkContactData,
  checkContactId,
};
