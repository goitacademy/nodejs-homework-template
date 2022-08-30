const {
  Contact,
  joiContactSchema,
  favoriteJoiContactSchema,
} = require("./contact");
const { User, joiUserSchema, subscriptionUserSchema } = require("./user");

module.exports = {
  Contact,
  joiContactSchema,
  favoriteJoiContactSchema,
  User,
  joiUserSchema,
  subscriptionUserSchema,
};
