const { Contact } = require('../../models');
const { catchAsync, AppError } = require('../../utils');

const getContactById = catchAsync (async (req, res) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
      res.status(200).json({
      contact,
    });
  });

  module.exports = getContactById;