const { isValidObjectId } = require('mongoose')
const { HttpError } = require('./HttpError')
const isValidId = (req, res, next) => {
    const { id } = req.params
    if (!isValidObjectId(id)) {
        next(HttpError(404, `${id} is not valid`))
    }
    next()
}
module.exports = isValidId