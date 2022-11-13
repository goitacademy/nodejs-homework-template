const validation = (schema) => {
    return function (req, res, next) {
        const validation = schema.validate(req.body);
        if (validation.error) {
            next(validation.error);
        }
        next()
    }
}

module.exports = { validation };