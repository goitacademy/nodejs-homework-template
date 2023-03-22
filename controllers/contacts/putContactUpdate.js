const createError = require('http-errors');

const { Contact } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const { contactDataValidator } = require('../../utils/contactValidation');

const putContactUpdate = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const { error } = contactDataValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  if (!name || !email || !phone) {
    throw createError(400, 'missing field');
  }

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
