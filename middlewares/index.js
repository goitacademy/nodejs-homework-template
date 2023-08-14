const {validateBody, validateFavorite} = require("./validateBody");
const handleMongooseError = require('./handleMongooseError');
const isValidId = require('./isValidId');

module.exports = {
    validateBody,
    validateFavorite,
    handleMongooseError,
    isValidId
}