const createError = require('http-errors');

const { Contact } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const deleteContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findByIdAndDelete(contactId, _id);

  if (!result) {
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
