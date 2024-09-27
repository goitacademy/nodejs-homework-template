const {isValidObjectId} = require("mongoose")

const {ResponseError} = require("../helpers")

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(ResponseError(400, `${id} is not valid id`))
    }
    next();
}

module.exports = isValidId;