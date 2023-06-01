const {HttpError} = require("../utils")

const validateBody = contactsSchema => {
    const func  = (req, res, next) => {
      const { error } = contactsSchema.validate(req.body);
  if (error) {
    return next (new HttpError(422, `${error}`));
        }  
        next()
    }
    return func
}

module.exports = validateBody