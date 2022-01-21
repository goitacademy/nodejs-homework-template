const { Contact, joiAddSchema, joiUpdSchema } = require('./contact');
const { User, joiUserSchema, joiUpdSubscriptionSchema } = require('./user');

module.exports = {
  Contact,
  User,
  joiAddSchema,
  joiUpdSchema,
  joiUserSchema,
  joiUpdSubscriptionSchema,
};
