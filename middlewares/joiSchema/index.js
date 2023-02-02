const { addContactSchema } = require("../joiSchema/addContactSchema");
const { updateContactSchema } = require("../joiSchema/updateContactSchema");
const { updateStatusContactSchema } = require("../joiSchema/updateStatusContactSchema");
const { addUserSchema } = require("../joiSchema/addUserSchema");
const { findUserSchema } = require("../joiSchema/findUserSchema");
const { updateSubscriptionSchema } = require("../joiSchema/updateSubscriptionSchema");

module.exports = {
    addContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
    addUserSchema,
    findUserSchema,
    updateSubscriptionSchema,
  };