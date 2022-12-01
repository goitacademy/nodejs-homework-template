const Joi = require('joi');
const contactsOperations = require("../../models/contacts");

const contactSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().required(),
    phone: Joi.number().min(7).required(),
})

const add = async (req, res, next) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            error.status = 400;
            throw error;
        }
        const result = await contactsOperations.addContact(req.body);
        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
};

module.exports = add;