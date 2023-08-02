const isValidId = require('./isValidId');
const validateBody = require('./validateBody');
const authenticate = require('./authenticate');
const checkFavoriteExist = require('./checkFavoriteExist');
const upload = require('./upload')

module.exports = {isValidId, validateBody, authenticate, checkFavoriteExist, upload};