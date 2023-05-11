const {HttpError} = require('../helpers')

<<<<<<< HEAD
const validateBody = (schema) => {
    const fn = (req, res, next) => {
        const validationResult = schema.validate(req.body);

        if (validationResult.error) {
            next(RequestError(404, "missing required name field"));
        }
        next();
    }
    return fn;
=======
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
>>>>>>> master
}

module.exports = validateBody;