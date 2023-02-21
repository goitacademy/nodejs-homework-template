const { personDataSchema, favoriteSchema } = require('./contacts');
const { authSchema } = require('./auth');
module.exports = {
  '/api/contacts/': personDataSchema,
  '/api/contacts/:id': personDataSchema,
  '/api/contacts/:id/favorite': favoriteSchema,
  '/api/auth': authSchema,
};

///mongodb+srv://MainUser:keUTVufEHVduUZCO@contactsdb.4ftab1n.mongodb.net/test
// mongodb+srv://mainUser:keUTVufEHVduUZCO@contactsdb.4ftab1n.mongodb.net/test
// //keUTVufEHVduUZCO
// mongodb+srv://myuser:MckhdxjqQUvMkvKF@contactsdb.4ftab1n.mongodb.net/test
// MckhdxjqQUvMkvKF;

// mongodb+srv://myuser:MckhdxjqQUvMkvKF@contactsdb.4ftab1n.mongodb.net/?retryWrites=true&w=majority
// contacts-db-12
