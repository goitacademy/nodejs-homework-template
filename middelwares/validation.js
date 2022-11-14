const validation = (schema) => {
    const validationFunc = (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({
                status: error.details[0].message,
                code: 400
            })
        }
        next();
    };
    return validationFunc;
};


module.exports =  validation;