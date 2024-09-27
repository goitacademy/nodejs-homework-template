const { catchAsync } = require('../../utils');

const createContact = catchAsync(async (req, res) => {


  const newContact = await Contact.create(req.body);

  res.status(201).json({
    msg: 'Success',
    contact: newContact,
  });
});

module.exports = createContact;