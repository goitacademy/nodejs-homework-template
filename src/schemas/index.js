const { addContactSchema } = require("./contacts/addContactSchema");
const { putContactSchema } = require("./contacts/putContactSchema");
const { updateStatusSchema } = require("./contacts/updateStatusSchema");
const { registerSchema } = require("./auth/registerSchema");
const { updateSubscriptionSchema } = require("./auth/updateSubscriptionSchema");

module.exports = {
  addContactSchema,
  putContactSchema,
  updateStatusSchema,
  registerSchema,
  updateSubscriptionSchema,
};
