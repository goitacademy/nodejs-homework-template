const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return next(
            isValidObjectId(id)
                ? null
                : HttpError(404, `Resource not found with id: ${id}`)
        );
    }

    next();
};

module.exports = isValidId;
