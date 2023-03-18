const createError = require('http-errors');

const { Contact } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const deleteContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndDelete(contactId);

  if (result === undefined) {
    throw createError(404, 'Not found');
  }
  res.status(200).json({
    status: 'succes',
    code: 200,
    message: 'contact deleted',
    data: { result },
  });
});

module.exports = deleteContactById;
