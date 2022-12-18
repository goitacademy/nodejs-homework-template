const { HttpError } = require('../helpers');

const validateBody = schema => {
    const func = (req, res, next) => {
        const keys = Object.keys(req.body)

        if (keys.length === 0) {
            next(HttpError(400, "missing required name field"));
        }

        const { error } = schema.validate(req.body);
        const isFavorite = keys.includes('favorite')

        if (error  && isFavorite && keys.length === 1) {
            next(HttpError(400, "missing field favorite"));
        } else 
        if (error) {
            next(HttpError(400, error.message));
        }
        next()
    }
    return func;
}

module.exports = validateBody;