const { BadRequestError, ValidationError } = require('../models/errors');
const { ContactSchema } = require('../schemas/contactSchema');

const validateContactFields = (req, _, next) => {
    const { error } = ContactSchema.validate(req.body);

    if(error) {
        const { message, context: { key } } = error.details[0];
        return next(
            new ValidationError({ message, key })
        );
    }

    next();
}

module.exports = {
    getContactValidationMiddleware: () => [validateContactFields]
}