const { Contact } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const getAllContacts = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const contactsList = await Contact.find({ owner: _id }, '', {
    skip,
    limit: Number(limit),
  }).populate('owner', '_id name email');

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contactsList },
  });
});

module.exports = getAllContacts;
