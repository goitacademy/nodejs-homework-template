const validation = (scheme) => {
    return (req, res, next) => {
        const { error } = scheme.validate(req.body);
        if (error) {
            error.status = 400;
            next(error);
            return;
        }
        next();
    }
}

module.exports = validation;