const { isValidObjectId } = require('mongoose')

const isValidId = (req, res, next) => {
  const { id } = req.params
  if (!isValidObjectId(id)) {
    const error = new Error(`${id} is not a valid id`)
    error.status = 400
    return next(error)
  }
  next()
}
module.exports = isValidId
