const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../models/helpers/index');

const isValidId = (req, res, next) => {
    const { id } = req.params;
    const isCorrectId = isValidObjectId(id);
    if (!isCorrectId) {
        const error = HttpError(400, `${id} is not correct id format`);
        next(error);
    }
    next();
}

module.exports = isValidId;