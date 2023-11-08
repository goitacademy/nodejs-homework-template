const {HttpError} = require('../helpers')

const validateBody = shema => {
    const func = (req, res, next)=> {
        
      const {error} = shema.validate(req.body)
      if(error){
        return next(HttpError(400, "missing fields"))
      } 
      next()
    }
    return func
}

module.exports = validateBody