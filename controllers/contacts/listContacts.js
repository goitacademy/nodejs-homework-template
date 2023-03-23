const { Contact } = require('../../models');
const { catchAsync } = require('../../utils');

const listContacts = catchAsync (async (req, res) => {
    const contacts = await Contact.find().select('-__v');
    res.status(200).json({
            contacts,
  });
});

module.exports = listContacts;