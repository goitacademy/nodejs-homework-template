const Joi = require('joi');


module.exports = {
    addUserValidation: (req, res, next) => {
        const schema = Joi.object({
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
                .required(),
            password: Joi.string()
                .min(8)
                .required(),
        });

    const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({ "message": ` ${validationResult.error}` });
        }
        next();
    }
}