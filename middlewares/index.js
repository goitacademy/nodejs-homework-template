const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const authMiddleware = require('./authMiddleware');

module.exports = {
    validation,
    ctrlWrapper,
    authMiddleware,
}