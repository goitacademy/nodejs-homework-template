const {HttpError} = require('../helpers')

const validateBody = schema => {
    const func = (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({ "message": "missing fields" })
        }
        const { error } = schema.validate(req.body)

        if (error) {
            next(HttpError(404, error.message))
        }
        next()
    }

    return func;
}

module.exports = validateBody;