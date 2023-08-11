const { HttpError } = require("../helpers");

const validationBody = (schema, errMessage) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) next(HttpError(400, "Missing required name field"));
        next();
    };
};

module.exports = validationBody;