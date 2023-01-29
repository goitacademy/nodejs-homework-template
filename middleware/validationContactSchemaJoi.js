const Joi = require('joi');

module.exports = {
    addValidationContacts: (req, res, next) => {
        const addSchema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phone: Joi.string().required(),
            favorite: Joi.boolean()
        });

        const validationSchemaJoi = addSchema.validate(req.body);
        if (validationSchemaJoi.error) {
            return res.status(404).json({ status: validationSchemaJoi.error.message });
        }

        next();
    }

}




