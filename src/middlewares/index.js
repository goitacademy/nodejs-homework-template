const isValidId = require('./isValidId');
const { addContactValidation,
    putContactValidation,
    updateContactFavoriteValidation,
    userRegisterValidation,} = require('./validationMiddlware');


module.exports = {
    isValidId,
    addContactValidation,
    putContactValidation,
    updateContactFavoriteValidation,
    userRegisterValidation,
}