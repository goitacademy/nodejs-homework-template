/* eslint-disable semi */
/* eslint-disable quotes */
const {
  Contact,
  contactJoiSchema,
  statusContactJoiSchema,
} = require("./contact");

const { User, userRegisterJoiSchema, userLoginJoiSchema } = require("./user");

module.exports = {
  Contact,
  contactJoiSchema,
  statusContactJoiSchema,
  User,
  userRegisterJoiSchema,
  userLoginJoiSchema,
};
