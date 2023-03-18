const createError = require('http-errors');

const { Contact } = require('../../models/index');

const { catchAsync } = require('../../utils/index');

const schema = require('../../schemas/contactSchema');

const postContact = catchAsync(async (req, res, next) => {
  const body = req.body;

  const { error } = schema.validate(body);
  if (error) {
    throw createError(400, error.message);
  }
  if (
    body.name === undefined ||
    body.email === undefined ||
    body.phone === undefined ||
    body.favorite === undefined
  ) {
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
