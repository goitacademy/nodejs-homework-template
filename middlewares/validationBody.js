const validationBody = (scheme) => {
    return (req, res, next) => {
        const { body } = req;

        const validation = scheme.validate(body);
        if (validation.error) {
            return res
                .status(400)
                .json(validation.error.details[0] );
        };

        next();
    };
};

module.exports = validationBody;
