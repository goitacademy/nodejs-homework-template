const HttpError = require('../helpers/HttpError');

const validateBody = (schema, errorMessage) => {
    const func = (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error) {
            next(HttpError(400, errorMessage || error));
        }
        next()
    }

    return func;
}

module.exports = validateBody