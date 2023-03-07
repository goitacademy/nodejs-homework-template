const { HttpError } = require("../helpers");



const validation = (schema) => {
    const validate = async (req, res, next) => {
        const body = req.body;

        if (Object.keys(body).length === 0) {
            next(HttpError (400, "missing fields"));
        }

        const { error } = schema.validate(body);

        if (error) {
            next(HttpError(400, error.message));
        }

        next();
    };

    return validate;
};

module.exports = validation;