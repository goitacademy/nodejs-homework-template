const { HttpError } = require("../helpers");

const validateBody = (schema, errorMessage) => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, errorMessage));
        }
        next()
    }

    return func;
};

module.exports = validateBody;