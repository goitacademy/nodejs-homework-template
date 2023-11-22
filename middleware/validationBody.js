const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
    const { contactId } = req.params;

    if (!isValidObjectId(contactId)) {
        const error = new Error('Invalid ObjectId');
        error.status = 400; 
        return next(error);
    }

    next();
};

module.exports = isValidId;