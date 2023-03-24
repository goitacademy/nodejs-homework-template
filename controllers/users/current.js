const { catchAsync } = require('../../utils');
const createError = require('http-errors');

const { User } = require('../../models');

const current = catchAsync(async (req, res, next) => {
  console.log(req.user);
});

module.exports = current;
