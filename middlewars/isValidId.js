const {isValidObjectId} = require('mongoose');

const HttpError = (status, message) => {
    const error = new Error(message);
    error.status = status;
    return error;
}

const isValidId = ( req, res, next) => {
    const {contactId} = req.params;
    console.log(contactId);
    if(!isValidObjectId(contactId)){
        next(HttpError(404, `${contactId} invalid id format`))
    }
    next();
}

module.exports = {isValidId};