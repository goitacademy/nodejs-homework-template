const RequestError = require('../helpers/RequestError');

const validateFavorite = schema => {
    const validateFunction = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(RequestError(400, 'missing required favorite field'));
        }
        next();
    }
    return validateFunction;
}

module.exports = validateFavorite;