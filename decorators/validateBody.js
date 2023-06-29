const { HttpError } = require("../helpers");

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpError(400, "Помилка від Joi або іншої бібліотеки валідації"))
        }
        next(error);
    }
    return func;
}

module.exports = validateBody