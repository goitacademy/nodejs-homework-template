const {
  postContactValidation,
  putValidation,
  patchValidation,
  userRegisterValidation,
  userLoginValidation,
} = require("./validation");

const auth = require("./auth");

module.exports = {
  postContactValidation,
  putValidation,
  patchValidation,
  userRegisterValidation,
  userLoginValidation,
  auth,
};
