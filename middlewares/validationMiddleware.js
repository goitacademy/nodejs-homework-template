const Joi = require("joi");

module.exports = {
    validation: (req, res, next) => {
        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            email: Joi.string()
                .email({ minDomainSegments: 2 })
                .required(),
            phone: Joi.alternatives([Joi.string(), Joi.number()]).required(),
        });

        const validateSchema = schema.validate(req.body);
        if (validateSchema.error) {
            return res.status(400).json({"message": "missing fields"});
        }
        
        next();
    }
};