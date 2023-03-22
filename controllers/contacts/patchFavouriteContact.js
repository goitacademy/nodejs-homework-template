const createError = require('http-errors');

const { Contact } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const {
  updateContactStatusValidator,
} = require('../../utils/ContactValidation');

const patchFavouriteContact = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  const { error } = updateContactStatusValidator(req.body);
  if (error) {
    throw createError(400, error.message);
  }

  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );

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

module.exports = patchFavouriteContact;
