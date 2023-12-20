const validateBody = require('../middlewares/validateBody');
const isValidId = require('./isValidId');
const isEmptyBody = require('./isEmptyBody');
const authenticate = require('./authenticate');


module.exports={
    validateBody,
    isValidId,
    isEmptyBody,
    authenticate
}