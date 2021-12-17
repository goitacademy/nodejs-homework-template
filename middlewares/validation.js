function validation(schema) {
    return function (req, res, next) {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            next(error);
        }
        next();
    }
}

module.exports = validation;