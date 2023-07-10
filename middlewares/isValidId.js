const { isValidObjectId } = require('mongoose');

const { errorHandler } = require('../helpers');

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        next(errorHandler(400, `${contactId} is not valid ID`));
    }
    next();
};

module.exports = isValidId;
