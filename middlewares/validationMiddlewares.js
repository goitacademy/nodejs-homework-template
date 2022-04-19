const Joi = require('joi');

const addContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string()
            // .alphanum()
            .min(3)
            .max(30)
            .regex(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      "Name can only consist of letters, apostrophes, dashes and spaces."
    )
            .required(),
        email: Joi.string()
            .email()
            .required(),
        phone: Joi.string()
            .min(10)
            .max(18)
            .pattern(/^[+]?[0-9]?[-.\s]?[(]?[0-9]{1,3}?[)]?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/)
            .message('Enter the phone in the following format (***) ***-****')
            .required()        
    })
    const validateResult = schema.validate(req.body);
    
    const error = validateResult.error
    if (error) {
        return res.status(400).json({
            message: `missing required ${error.details[0].message}`,
            status: error.details
        });
    }
    next();
}
module.exports = {
    addContactValidation
}