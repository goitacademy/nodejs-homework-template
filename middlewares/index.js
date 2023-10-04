const validateBody = require('./validateBody');
const isValidId = require('./isValidId');
const isEmptyBody = require('./isEmptyBody');
const isValidEmail = require('./isValidEmail');
const authenticate = require('./authenticate');
const isEmptyFieldAvatar = require('./isEmptyFieldAvatar')
const upload = require('./uploadAvatar');

module.exports = {
    validateBody,
    isValidId,
    isEmptyBody,
    isValidEmail,
    authenticate,
    isEmptyFieldAvatar,
    upload,
}