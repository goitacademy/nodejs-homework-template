const { Contact } = require('../../models');
const { catchAsync } = require('../../utils');

const addContact = catchAsync(async (req, res, next) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json({
      contact: newContact,
    });
  });

  module.exports = addContact;