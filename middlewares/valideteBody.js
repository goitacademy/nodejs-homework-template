const {HttpError} = require('../helpers/HttpError')

const validateBody = (schema) => {
  const func = (req, res, next) => {
      if (!Object.keys(req.body).length) {
       return next(HttpError(400, 'missing fields'));
      }
      const {error} = schema.validate(req.body)
      if (error) {
        const nameField = error.details[0].path[0];
      return next(HttpError(400,  `missing required ${nameField} field` ));
      }
      next()
    }
    return func
}


module.exports = {validateBody};
