const Joi = require('joi');


module.exports = {
    addValidation: (req, res, next) => {
        const schema = Joi.object({
            id: Joi.string(),
            name: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
    })

    const validationResult = schema.validate(req.body);
    if(validationResult.error){
        return res.status(400).json({ status: validationResult.error.details, message: 'Oops... something wrong!'})
    }
    next()
}
}