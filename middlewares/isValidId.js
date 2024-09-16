const { isValidObjectId } = require('mongoose');
const { HttpError } = require('../helpers');

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        next(HttpError(400, `${contactId} is not valis id`));
    }
    next();
}

module.exports = isValidId;