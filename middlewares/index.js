const { addContactSchema } = require("../middlewares/joiSchema/addContactSchema");
const { updateContactSchema } = require("../middlewares/joiSchema/updateContactSchema");
const { updateStatusContactSchema } = require("../middlewares/joiSchema/updateStatusContactSchema");
const { addUserSchema } = require("../middlewares/joiSchema/addUserSchema");
const { findUserSchema } = require("../middlewares/joiSchema/findUserSchema");
const { updateSubscriptionSchema } = require("../middlewares/joiSchema/updateSubscriptionSchema");
const { validateBody } = require("../middlewares/validateSchema/validateBody");
const { auth } = require("../middlewares/validateSchema/auth");

module.exports = {
    addContactSchema,
    updateContactSchema,
    updateStatusContactSchema,
    addUserSchema,
    findUserSchema,
    updateSubscriptionSchema,
    validateBody,
    auth,
  };