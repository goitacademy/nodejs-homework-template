const {HttpErrors} = require('../helpers')

const validateBody = schema => {
    const validate = (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            next(HttpErrors(400, error.message));
        };

        next()
    };
    return validate
};

module.exports = validateBody;