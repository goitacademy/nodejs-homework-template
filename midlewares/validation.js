const createError = require("http-errors");

const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            next(createError(400, error.message));
        }
        next();
    };
};

module.exports = validation;
