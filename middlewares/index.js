const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const isEmptyBody = require('./isEmptyBody');
const authenticate = require('./authenticate');
const isEmptyFieldAvatar = require('./isEmptyFieldAvatar')
const upload = require('./uploadAvatar');

module.exports = {
    validateBody,
    isValidId,
    isEmptyBody,
    authenticate,
    isEmptyFieldAvatar,
    upload,
}