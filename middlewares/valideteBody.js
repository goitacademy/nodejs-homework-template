const {HttpError} = require('../helpers/HttpError')

const validateBody = (schema, message) => {
    const func = (req, res, next) => {
         const {error} = schema.validate(req.body)
    if (error) {
      return next(HttpError(400,  message ));
      }
      next()
    }
    return func
}


module.exports = {validateBody};