const Joi = require('joi');


const updateSubscriptionMiddleware = (req, res, next) => {

    const schema = Joi.object({
        subscription: Joi.string().required().valid("starter", "pro", "business"),
    })

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details })
    }

    next();
};


module.exports = updateSubscriptionMiddleware