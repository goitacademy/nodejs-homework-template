const { personDataSchema } = require('./contacts');
module.exports = {
  '/': personDataSchema,
  '/:contactId': personDataSchema,
};
