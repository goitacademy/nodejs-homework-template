const catchAsync = require("./catchAsync");
const contactDataValidator = require("./contactValidation");
const updateContactStatusValidator = require("./contactValidation");
const userRegisterValidator = required("./userValidation.js");

module.exports = {
  catchAsync,
  contactDataValidator,
  updateContactStatusValidator,
  userRegisterValidator,
};
