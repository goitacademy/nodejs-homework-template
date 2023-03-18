const createError = require('http-errors');

const { Contact } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const schema = require('../../schemas/contactSchema');

const putContactUpdate = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const { error } = schema.validateAsync(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  // const { name, email, phone, favorite } = req.body;

  // if (
  //   name === undefined ||
  //   email === undefined ||
  //   phone === undefined ||
  //   favorite === undefined
  // ) {
  //   throw createError(400, 'missing fields');
  // }

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    throw createError(404, 'Not found');
  }

  res.json({
    status: 'success',
    code: 200,
    message: 'updated',
    data: { result },
  });
});

module.exports = putContactUpdate;
