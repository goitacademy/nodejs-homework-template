const joi = require('joi');

module.exports = {
    addContactsValidation: (req, res, next) => {
        const schema = joi.object({
            name: joi.string()
                .min(2)
                .max(30)
                .required(),
            email: joi.string()
                .min(5)
                .max(50)
                .required(),
            phone: joi.string()
                .min(8)
                .max(16)
                .required(),
        });

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            console.log(validationResult.error)
            return res.json({ message: "missing required name field", status: 400 });
        }
        next();
    }, 

    putContactsValidation: (req, res, next) => {
        const schema = joi.object({
            name: joi.string()
                .min(2)
                .max(30)
                .optional(),
            email: joi.string()
                .min(5)
                .max(50)
                .optional(),
            phone: joi.string()
                .min(8)
                .max(16)
                .optional(),
        });

        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            console.log(validationResult.error)
            return res.json({ message: "missing required name field", status: 400 });
        }
        next();
    }, 
};