const { NotFound } = require('http-errors');
const Contact = require('../../models/contacts.models');
const { catchAsync } = require('../../utils');

const updateStatusContact = catchAsync(async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw new NotFound("Not found");
    }

    res.json(result);
  } catch (error) {
    next();
  }
});

module.exports = updateStatusContact;