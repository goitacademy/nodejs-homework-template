const Joi = require('joi');

module.exports = {
        addContactValidation: (req, res, next) => {
            const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(2)
            .max(20)
            .required(),
        
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        phone: Joi.string()
            .min(10)
            .max(15)
            .required(),
        });

        const validationResult = schema.validate(req.body);

        if (validationResult.error) {
        return res.status(400).json({ "message": validationResult.error.details[0].message, status: 400 });
        }
        
        next();
    },
    
    putContactValidation: (req, res, next) => {
        const schema = Joi.object({
        name: Joi.string()
            .alphanum()
            .min(2)
            .max(20)
            .optional(),
        
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .optional(),
        phone: Joi.string()
            .min(10)
            .max(15)
            .optional(),
        });

    const validationResult = schema.validate(req.body);
    
    if (validationResult.error) {
        return res.status(400).json({ "message": validationResult.error.details[0].message, status: 400 });
    }
    
        next();
    },
}