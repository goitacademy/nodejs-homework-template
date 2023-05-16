const {RequestError} = require('../helpers')

const validateBody = (schema) => {
    const fn = (req, res, next) => {
        const validationResult = schema.validate(req.body);

        if (validationResult.error) {
            next(RequestError(404, "missing required name field"));
        }
        next();
    }
    return fn;
<<<<<<< HEAD
=======
=======
const validateBody = schema => {

    const func = (req, res, next) => {

        const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, error.message));
    }
    next()
    }
    return func;
>>>>>>> master
>>>>>>> b2b353669b449349822edecb08b428e80cfd37d8
}

module.exports = validateBody;