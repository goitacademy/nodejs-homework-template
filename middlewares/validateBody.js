const RequestError = require('../helpers/RequestError');

const validateBody = schema => {
    const validateFunction = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(RequestError(400, 'missing required name field'));
        }
        next();
    }
    return validateFunction;
}

module.exports = validateBody;