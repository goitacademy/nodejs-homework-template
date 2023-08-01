const { validateBody, validateFavoriteBody } = require('./validateBody');
const isValidId = require('./isValidId');
const auth = require('./auth');

module.exports = { validateBody, isValidId, validateFavoriteBody, auth };
