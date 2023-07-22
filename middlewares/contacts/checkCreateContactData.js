// ./midlewares/contacts/checkCreateContactData.js

const { AppError, catchAsync, contactValidators } = require('../../utils');
const services = require('../../services/contacts');

/**
 * Перевірка та обробка даних для створення нового контакту.
 */
exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidators.createContactDataValidator(
    req.body
  );

  if (error) {
    throw new AppError(400, 'Invalid contact data..');
  }

  const contactExists = await services.checkContactExists({
    email: value.email,
  });

  if (contactExists) {
    throw new AppError(409, 'contact with this email exists..');
  }

  req.body = value;

  next();
});
