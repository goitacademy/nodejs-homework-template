const { Types } = require('mongoose');
const HttpError = require('../helpers/HttpErorr')

function validateId (req, res, next) {

    const { contactId } = req.params;

    if( !Types.ObjectId.isValid( contactId ) ) throw HttpError(404); 

    next();
}

module.exports = validateId;