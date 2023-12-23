const validateBody = require('../middlewares/validateBody');
const isValidId = require('./isValidId');
const isEmptyBody = require('./isEmptyBody');
const authenticate = require('./authenticate');
const upload = require ('./upload.js');

module.exports={
    validateBody,
    isValidId,
    isEmptyBody,
    authenticate,
    upload
}