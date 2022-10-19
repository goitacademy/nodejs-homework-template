const { isValidObjectId } = require('mongoose');
const RequestError  = require('./requestError')

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    const result = isValidObjectId(contactId);
    if (!result) {
        next(RequestError(400, "Invalid id"));
    }
    next()
};

module.exports = isValidId;