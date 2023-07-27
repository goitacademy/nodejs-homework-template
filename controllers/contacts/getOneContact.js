// ./controllers/contacts/getOneContact.js

const services = require('../../services/contacts');
const { catchAsync } = require('../../utils');

/**
 * Контролер знаходження контакту за ідентифікатором.
 */
const getOneContact = catchAsync(async (req, res) => {
  const contact = await services.getOneContact(req.params.id);

  res.status(200).json({
    msg: 'Success',
    contact,
  });
});

module.exports = getOneContact;
