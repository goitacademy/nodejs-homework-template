const isValidId = require('./isValidId');
const { addContactValidation,
    putContactValidation,
    updateContactFavoriteValidation,
    userRegisterValidation,
userLoginValidation, } = require('./validationMiddlware');
const auth = require('./auth');

module.exports = {
    isValidId,
    addContactValidation,
    putContactValidation,
    updateContactFavoriteValidation,
    userRegisterValidation,
    userLoginValidation,
    auth,
}