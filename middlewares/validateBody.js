const {RequestError} = require('../helpers')

const validateBody = schema => {
  const func = (req, res, next) => {
      const { error } = addSchema.validate(req.body);
    if (error) {
     next(RequestError(400, "Missing fields")); 
    }
  }
  return func;
}

module.exports = validateBody;