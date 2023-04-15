const Joi = require('joi');


module.exports = {
    addContactValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(15)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            phone: Joi.string()
                .min(13)
                .pattern(
                    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
                )
                .required(),
            favorite: Joi.boolean()
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ "message": ` ${validationResult.error}` });
        }
        next();
    }
}