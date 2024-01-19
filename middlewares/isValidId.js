const { isValidObjectId } = require("mongoose");

const HttpError = require("../helpers");

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (isValidObjectId(id)) {
        next(HttpError(400, `${id} is not a valid`))
    }
    next();
};

module.exports = isValidId;