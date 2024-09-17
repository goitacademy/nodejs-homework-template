const fs = require('fs').promises;

const { AppError, catchAsync } = require('../utils');

exports.checkContactId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (id.length < 10) {
    // return res.status(400).json({
    //   msg: 'Invalid ID..',
    // });
    throw new AppError(400, 'Invalid ID..');
  }

  const contacts = JSON.parse(await fs.readFile('models.json'));

  const contact = contacts.find((item) => item.id === id);

  if (!contact) throw new AppError(404, 'Contact does not exist..');

  req.contact = contact;

  next();
});