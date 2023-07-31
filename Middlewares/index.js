const isValidId = require('../Middlewares/isValidId');
const {
  validateSchemeAddContact,
  validateSchemeUpdContact,
  validateSchemeFavorContact,
} = require("../Middlewares/validateContacts");
const validateUser = require('../Middlewares/validateUser');
const validateToken = require('../Middlewares/validateToken');
const upload = require('../Middlewares/upload');

module.exports = {
  isValidId,
  validateSchemeAddContact,
  validateSchemeUpdContact,
  validateSchemeFavorContact,
  validateUser,
  validateToken,
 upload,
};