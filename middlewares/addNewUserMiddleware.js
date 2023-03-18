const Joi = require('joi');


const addNewUserMiddleware = (req, res, next) => {
    const schema = Joi.object({
        password: Joi.string()
            .alphanum()
            .min(6)
            .required(),
        email: Joi.string()
            .email()
            .required(),
    })

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details })
    }

    next();
};


module.exports = addNewUserMiddleware