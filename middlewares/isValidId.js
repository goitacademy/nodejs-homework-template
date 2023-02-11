const {isValidObjectId} = require("mongoose");

const {HttpError} = require("../helpers");

const isValidId = (req, res, next)=> {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        next(HttpError(404, `${id} not valid id format`))
    }
    next();
}

module.exports = isValidId;