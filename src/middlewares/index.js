const isValidId = require('./isValidId');
const { addContactValidation,
    putContactValidation,
updateContactFavoriteValidation} = require('./validationMiddlware');


module.exports = {
    isValidId,
    addContactValidation,
    putContactValidation,
    updateContactFavoriteValidation,
}