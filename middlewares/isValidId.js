const {isValidObjectId}= require ("mongoose");

const {HttpErrors} = require("../helpers");

const isValidId = (req, res, next) => {
    const {id} = req.params;
    if(!isValidObjectId(id)) {
        next(HttpErrors(400, `${id} is not valid id`))
    }
    next()
}

module.exports = {
    isValidId,
}