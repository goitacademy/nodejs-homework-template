const Joi = require('joi');


module.exports = {
    updateStatusContactValidation: (req, res, next) => {
        if (!req.body) {
            return res.status(400).json({"message": "missing field favorite"});
        }
        
        const schema = Joi.object({
            favorite: Joi.boolean()
            .required(),
        });
        const validationResult = schema.validate(req.body);
        if (validationResult.error) {
            return res.status(400).json({"message":` ${validationResult.error}`});
        }
        next();
    }
}