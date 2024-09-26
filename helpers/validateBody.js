const HttpError = require('./httpError.js');

const validateBody = (schema) => {
    const func = async (req, res, next) => {
        if (!Object.keys(req.body).length) {
            return next(HttpError(400, "All fields empty"));
        }

        try {
            await schema.validateAsync(req.body);
            next();
        } catch (error) {
            if (error.details && error.details[0]) {
                return next(HttpError(400, error.details[0].message));
            } else {
                return next(HttpError(400, "Invalid request data"));
            }
        }
    };

    return func;
};

module.exports = validateBody;
