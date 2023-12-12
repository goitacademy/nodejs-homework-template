const validateBody = require('../middlewares/validateBody');
const isValidId = require('./isValidId');
const isEmptyBody = require('./isEmptyBody')

module.exports={
    validateBody,
    isValidId,
    isEmptyBody
}