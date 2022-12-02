const Joi = require('joi');

const validation =  (req, res, next) => {
    
    const contactSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(7).required(),
    });
    
    const validationResult = contactSchema.validate(req.body);

    if (validationResult.error) {
        return res.status(400)
            .json({
                'message': validationResult.error.message,
                'status': 400,
            });
    }

    next();
};

module.exports = validation;