const { Contact } = require('../../models/index');
const createError = require('http-errors');

const { catchAsync } = require('../../utils/index');

const getContactById = catchAsync(async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;

  const result = await Contact.findById(contactId, _id).populate(
    'owner',
    '_id name email'
  );

  if (!result) {
    throw createError(404, `Contact with id ${contactId} not found`);
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
});

module.exports = getContactById;
