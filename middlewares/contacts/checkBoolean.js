// ./midlewares/contacts/checkBoolean.js

const { catchAsync } = require('../../utils');

/* eslint-disable */
exports.checkBoolean = catchAsync(async (req, res, next) => {
  const { favorite } = req.body;

  // Check if the value is boolean
  if (typeof favorite !== 'boolean') {
    return res.status(400).json({ error: 'The value must be boolean' });
  }

  next();
});
