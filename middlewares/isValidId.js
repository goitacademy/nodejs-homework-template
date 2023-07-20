const {isValidObjectId} = require("mongoose");

const {HttpError} = require("../utils/HttpError")

const isValidId = (req, res, next) => {
    const {id} = req.params;
    console.log(id);
    if(isValidObjectId(id)) {
        next(HttpError(400, `id:${id} is not valid`))
    }
    next();
};

module.exports = isValidId;