const Joi = require('joi');


module.exports = {
    updateContactValidation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .min(3)
                .max(15),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            phone: Joi.string()
                .min(13)
                .pattern(
                    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
                ),
            favorite: Joi.boolean()
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ "message": ` ${validationResult.error}` });
        }
        next();
    }
}