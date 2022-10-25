const validation = (schema) => {
    return (req, res, next) => {
         const validationResult = schema.validate(req.body);
        if (validationResult.error) {
           return res.status(400).json({
                status: validationResult.error.details,
                code: 400,
                message: "empty fields"
            });
        }
        next();
    }
}

module.exports = validation;