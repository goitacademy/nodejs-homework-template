// Ти тут юзаєш  HttpError - це треба підключити

const HttpError = require("../helpers/HttpError");

const validateBody = (schema) => {
    const fn = (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message);
        }
        next();
    };
    return fn;
};

module.exports = validateBody;
