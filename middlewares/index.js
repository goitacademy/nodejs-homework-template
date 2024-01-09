const validateBody = require('./validateBody');
const { checkValidId } = require('./contactMiddleware');
const userMiddleware = require('./userMiddleware');
const validateQuery = require('./validateQuery');

module.exports = {
    validateBody,
    checkValidId,
    userMiddleware,
    validateQuery,
};
