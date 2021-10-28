const {checkFieldInContact, checkIdInContact} = require('./checkMiddleware');
const {
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
} = require('./validationMiddleware');

module.exports = {
  checkFieldInContact,
  checkIdInContact,
  addContactValidation,
  updateContactValidation,
  updateStatusContactValidation,
};
