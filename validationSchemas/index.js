const { personDataSchema, contactIdSchema } = require('./contacts');
module.exports = {
  '/contacts': personDataSchema,
  '/:contactId': contactIdSchema,
};
