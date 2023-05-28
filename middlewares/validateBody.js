const {HttpError} = require("../utils")

const validateBody = contactsSchema => {
    const func  = (req, res, next) => {
      const { error } = contactsSchema.validate(req.body);
  if (error) {
    return next (new HttpError(400, error.message));
        }  
        next()
    }
    return func
}

module.exports = validateBody