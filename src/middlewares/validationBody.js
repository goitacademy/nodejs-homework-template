const validation = (schema) => {
    return function (req, res, next) {
        const validation = schema.validate(req.body);
        if (validation.error) {
            res.status(400).json(validation.error.message);
            next(validation.error);
        }
        next()
    }
}

module.exports = { validation };