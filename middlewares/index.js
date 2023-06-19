const isValidId = require('./isValidId');
const authentication = require('./authenticate')
const upload = require('./upload')

module.exports = {
    isValidId,
    authentication,
    upload,
}