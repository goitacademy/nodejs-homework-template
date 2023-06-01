const {isValidObjectId } = require("mongoose")
const {HttpError} = require("../utils")

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if (!isValidObjectId (id)) {
        return next(new HttpError(400))
    }
    next()
}

module.exports = isValidId;