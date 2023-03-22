const createError = require('http-errors');

const { Contact } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const { contactDataValidator } = require('../../utils/contactValidation');

const postContact = catchAsync(async (req, res, next) => {
  const { name, email, phone } = req.body;

  const { error } = contactDataValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  if (!name || !email || !phone) {
    throw createError(400, 'missing required name field');
  }

  const result = await Contact.create(req.body);

  res.status(201).json({
    status: 'added',
    code: 201,
    data: { result },
  });
});

module.exports = postContact;
