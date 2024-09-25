const contactsOperations = require('../../models/contacts');
const Joi = require('joi');

const contactsSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] }
    }),

    phone: Joi.string().regex(/^[0-9]{10}$/).messages({ 'string.pattern.base': `Phone number must have 10 digits.` }).required(),
});

const add = async (req, res, next) => {
    try {
        const { error } = contactsSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const result = await contactsOperations.addContact(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            result: {
                result
            },
        })
    } catch (error) {
        next(error)
    }
  
};

module.exports = add;