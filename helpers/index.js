const path = require('path')
const httpError = require(path.join(__dirname, 'httpError'))
const ctrlWrapper = require(path.join(__dirname, 'ctrlWrapper'))

module.exports = {
    httpError,
    ctrlWrapper,
}