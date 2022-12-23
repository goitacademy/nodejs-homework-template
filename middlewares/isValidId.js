const { isValidObjectId } = require("mongoose")

const { HttpError } = require("../helpers/HttpErrors")

const isValidId = (req, res, next) => {
    const { id } = req.params

console.log(isValidObjectId(id)) // "false" is always. why?
    
    // if (!isValidObjectId(id)) {
    //     next(HttpError(404, "Invalid id"))
    // }
    next()
    
}

module.exports = { isValidId }