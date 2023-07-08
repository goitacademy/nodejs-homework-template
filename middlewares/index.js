const validateBody = require('./validateBody');
const isValidId = require('./isValidId')
const authorization = require('./Authorization');
const upload = require('./upload');

module.exports = {
    validateBody,
    isValidId,
    authorization,
    upload,
};