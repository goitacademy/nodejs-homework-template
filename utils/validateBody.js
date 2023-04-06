const validateBody = schema => {
    const func = async (req, res, next) => {
        const {error} = schema.validate(req.body);
    if (error) {
     next ( createHttpError(400, error.message));
        }
        next();
    }
    return func;
}

module.exports = validateBody;