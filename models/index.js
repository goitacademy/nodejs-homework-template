const { Contact } = require("./contact");
const {
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
  joiUpdateAvatarSchema,
} = require("./user");

module.exports = {
  Contact,
  User,
  joiRegisterSchema,
  joiLoginSchema,
  joiUpdateSubscriptionSchema,
  joiUpdateAvatarSchema,
};
