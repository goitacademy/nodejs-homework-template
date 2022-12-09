const isValidId = require('./isValidId');
const { addContactValidation,
    putContactValidation,
patchContactValidation} = require('./validationMiddlware');


module.exports = {
    isValidId,
    addContactValidation,
    putContactValidation,
    patchContactValidation,
}