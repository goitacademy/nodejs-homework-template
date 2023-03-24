const { Contact } = require('../../models/index');
const { catchAsync } = require('../../utils/index');

const getAllContacts = catchAsync(async (req, res, next) => {
  const { _id } = req.user;
  const contactsList = await Contact.find({ owner: _id });

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contactsList },
  });
});

module.exports = getAllContacts;
