const {
  contactSchema,
  contactStatusSchema,
} = require("./validateContactSchema");
const { subscriptionSchema } = require("./validateSubscriptionSchema");
const { userSchema } = require("./validateUserSchema");

module.exports = {
  contactSchema,
  contactStatusSchema,
  subscriptionSchema,
  userSchema,
};
