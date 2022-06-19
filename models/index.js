const {
  Contact,
  joiContactSchema,
  favoriteStatusSchema,
} = require("./contact");

const { User, joiUserSchema } = require("./user");

module.exports = {
  Contact,
  User,
  joiContactSchema,
  favoriteStatusSchema,
  joiUserSchema,
};
