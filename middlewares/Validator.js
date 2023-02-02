const {HttpError} = require("../helpers")

const validateBody = schema => {
    const func = (req, res, next)=> {
        const {error} = schema.validate(req.body);
        if(error) {
            next(HttpError(400, error.message))
            // Помилка від Joi або іншої бібліотеки валідації
        }
        next()
    }

    return func;
}

module.exports = validateBody;