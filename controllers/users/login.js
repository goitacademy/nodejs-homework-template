const { catchAsync } = require('../../utils/index');
const createError = require('http-errors');

const { userLoginValidator } = require('../../utils');
const { User } = require('../../models/index');

const login = catchAsync(async (req, res, next) => {
});
module.exports = login;
