const isValidId = require('../middlewares/isValidId');

const authenticate = require('../middlewares/authenticate');

const validateBody = require('../middlewares/validateBody');

module.exports = {
    authenticate,
    isValidId,
    validateBody
};