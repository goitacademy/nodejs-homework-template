const HttpError = require("../helpers/HttpError")

const validateBody = schema => {
    const func = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing required name field")
        }
        next()
    }
    return func
}

module.exports = validateBody;