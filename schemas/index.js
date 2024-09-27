const contactSchema = require("./contactSchema");
const updateFavoriteSchema = require("./updateFavoriteSchema");
const {
  registerSchema,
  loginSchema,
  subscriptionSchema,
} = require("./userSchema");

module.exports = {
  contactSchema,
  updateFavoriteSchema,
  registerSchema,
  loginSchema,
  subscriptionSchema,
};
