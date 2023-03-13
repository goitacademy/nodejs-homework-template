const contactsOperations = require('../../models/contacts');

const { catchAsync } = require('../../utils/index');

const getAllContacts = catchAsync(async (req, res, next) => {
  const contactsList = await contactsOperations.listContacts();

  res.status(200).json({
    status: 'success',
    code: 200,
    data: { result: contactsList },
  });
});

module.exports = getAllContacts;
