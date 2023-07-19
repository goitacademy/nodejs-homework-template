const {HttpError} = require('../helpers')

const validateBody = schema => {

  const func = (req, res, next) => {
      
    if (JSON.stringify(req.body) === "{}") {
       next(HttpError(400, 'missing fields'))
    }

      const { error } = schema.validate(req.body);

        if (error) {
      next(HttpError(400, error.message))
        }
        next()
  
}
    
    return func;
}


module.exports = validateBody