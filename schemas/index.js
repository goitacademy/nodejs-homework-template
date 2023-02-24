const { personDataSchema, favoriteSchema } = require('./contacts');
const { logInSchema, subscriptionSchema } = require('./user');
module.exports = {
  '/api/contacts': personDataSchema,
  '/api/contacts/:id': personDataSchema,
  '/api/contacts/:id/favorite': favoriteSchema,
  '/api/auth/signup': logInSchema,
  '/api/auth/login': logInSchema,
  '/api/users': subscriptionSchema,
};
