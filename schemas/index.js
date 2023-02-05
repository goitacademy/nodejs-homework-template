const { contactSchema } = require("./contactSchema");
const { contactStatusSchema } = require("./contactStatusSchema");
const { userSignupSchema } = require("./userSignupSchema");
const { userLoginSchema } = require("./userLoginSchema");
const { userSubscriptionSchema } = require("./userSubscriptionSchema");

module.exports = {
  contactSchema,
  contactStatusSchema,
  userSignupSchema,
  userLoginSchema,
  userSubscriptionSchema,
};
