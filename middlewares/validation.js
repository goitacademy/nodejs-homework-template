const validation = (scheme) => {
    return async (req, res, next) => {
        const { error } = scheme.validate(req.body);
        if (error) {
            res.status(400).json({
                status: 'error',
                code: 400,
                message: error.message
            });
            return;
        }
        next();
    }
};

module.exports = validation;