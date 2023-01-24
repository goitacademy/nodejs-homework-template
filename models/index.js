const { Contact, joiSchema, favoriteJoiSchema } = require("./contacts");
const {
  User,
  joiRegistrationSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
  reVerificationSchema,
} = require("./users");

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema,
  User,
  joiRegistrationSchema,
  joiLoginSchema,
  subscriptionJoiSchema,
  reVerificationSchema,
};
