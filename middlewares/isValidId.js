const {isValidObjectId} = require("mongoose");

const {HttpError} = require("../../Node.js-56-57/lesson-6/main-project/helpers");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        next(HttpError(400, `${id} is not valid id`))
    }
    next();
}

module.exports = isValidId;