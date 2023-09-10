const contactsService = require('./contacts/contacts');
const usersService = require('./users/users');
const emailService = require('../middlewares/verificationEmail');

module.exports = {
  contactsService,
  usersService,
  emailService,
};