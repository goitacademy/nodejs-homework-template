const contactsOperation = require('../../model/db');

const Joi = require('joi');
const contactsSchema = Joi.object({
    name: Joi.required(),
    email: Joi.required(),
    phone: Joi.required(),
})

const add = async (req, res, next) => {
    try {
        const { error } = contactsSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const result = await contactsOperation.add(req.body);
        res.status(201).json({
            status: 'success',
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error)
    }
};

module.exports = add;