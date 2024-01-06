const { RequestError } = require('../helpers/RequestError')

const validateBody = (schema) => {
    const fn = (req, res, next) => {
        const validationResult = schema.validate(req.body)

        if (validationResult.error) {
            next(RequestError(404, "missing required name field"))
        }
        next()
    }
    return fn
}

module.exports = validateBody