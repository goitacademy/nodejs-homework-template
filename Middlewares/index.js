const isValidId = require('../Middlewares/isValidId');
const {
  validateSchemeAddContact,
  validateSchemeUpdContact,
  validateSchemeFavorContact,
} = require("../Middlewares/validateContacts");

module.exports = {
  isValidId,
  validateSchemeAddContact,
  validateSchemeUpdContact,
  validateSchemeFavorContact,
};