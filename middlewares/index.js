const {
  postContactValidation,
  putValidation,
  patchValidation,
  userRegisterValidation,
  userLoginValidation,
} = require('./validation');

const { auth } = require('./auth');
const ctrlWrapper = require('./ctrlWrapper');

module.exports = {
  postContactValidation,
  putValidation,
  patchValidation,
  userRegisterValidation,
  userLoginValidation,
  auth,
  ctrlWrapper,
};
