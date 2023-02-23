const { personDataSchema, favoriteSchema } = require('./contacts');
const { signUpSchema, logInSchema } = require('./user');
module.exports = {
  '/api/contacts': personDataSchema,
  '/api/contacts/:id': personDataSchema,
  '/api/contacts/:id/favorite': favoriteSchema,
  '/api/auth/signup': logInSchema,
  '/api/auth/login': logInSchema,
};
