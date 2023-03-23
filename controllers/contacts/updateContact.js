const { Contact } = require('../../models');
const { catchAsync } = require('../../utils');

const updateContact = catchAsync (async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const updatedContact = await Contact.findByIdAndUpdate(id, body, {new: true});
    res.status(200).json({
        updatedContact,
    });
  });

  module.exports = updateContact;