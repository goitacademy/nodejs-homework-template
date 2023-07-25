const { contactSchema } = require("./contactSchema");
const { favoriteSchema } = require("./favoriteSchema");
const { contactPutSchema } = require("./contactPutSchema");
const { registerSchema } = require("./registerSchema");
const { loginSchema } = require("./loginSchema");
const { updateSubscription } = require("./updateSubscription");
const { phoneRegexp, emailRegexp } = require("./regexp");

const schemas = {
  contactSchema,
  favoriteSchema,
  contactPutSchema,
  registerSchema,
  loginSchema,
  updateSubscription,
  phoneRegexp,
  emailRegexp,
};
module.exports = { schemas };
