const {HttpError} = require("../helpers");

const validation = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, error.message));
        }
        next();
    };
};

module.exports = validation;