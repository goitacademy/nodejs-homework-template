const { AppError, catchAsync, contactValidators } = require('../../utils');
const Contact = require('../../models/contactModel');

exports.checkCreateContactData = catchAsync(async (req, res, next) => {
  const { error, value } = contactValidators.createContactDataValidator(
    req.body
  );

  if (error) {
    throw new AppError(400, 'Invalid contact data..');
  }

  const contactExists = await Contact.exists({ email: value.email });

  if (contactExists) {
    throw new AppError(409, 'contact with this email exists..');
  }

  req.body = value;

  next();
});
