const { HttpError } = require('../helpers');

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        const keys = Object.keys(req.body)
        const isFavorite = keys.includes('favorite')
        console.log(keys.length)
        console.log(error)

        if (error  && isFavorite && keys.length === 1) {
            next(HttpError(400, "missing field favorite"));
        } else 
        if (error) {
            next(HttpError(400, "missing required name field"));
        }
        next()
    }
    return func;
}

module.exports = validateBody;