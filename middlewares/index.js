const isValidId = require('../middlewares/isValidId');

const authenticate = require('../middlewares/authenticate');

const validateBody = require('../middlewares/validateBody');

const upload = require('../middlewares/upload');

module.exports = {
    authenticate,
    isValidId,
    validateBody,
    upload,
};