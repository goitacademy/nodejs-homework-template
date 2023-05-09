const {HttpError} = require('../helpers')

const validateBody = schema => {
<<<<<<< HEAD
    const func = (req, res, next) => {
=======
    const func = (requirement, response, next) => {
>>>>>>> master
        const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next()
    }
    return func;
}

module.exports = validateBody;