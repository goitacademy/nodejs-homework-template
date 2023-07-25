const isValidId = require('../Middlewares/isValidId');
const {
  validateSchemeAddContact,
  validateSchemeUpdContact,
  validateSchemeFavorContact,
} = require("../Middlewares/validateContacts");
const validateToken = require('../Middlewares/validateToken')
module.exports = {
  isValidId,
  validateSchemeAddContact,
  validateSchemeUpdContact,
  validateSchemeFavorContact,
 validateToken
};