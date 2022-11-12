const authenticate = require('./authenticate');
const validateBody = require('./validateBody');
const idValid = require('./idValid');
const upload = require('./upload')

module.exports = {
    authenticate,
    validateBody,
    idValid,
    upload
}