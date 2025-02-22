const Joi = require('joi');
const Contact = require('../../models/contact.js')

const contactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const addContact = async (req, res, next) => {
    try {
        const { name, phone, email } = req.body;
        const favorite = false;
        const validate = contactSchema.validate({
            name, phone, email, favorite
        });
        if (validate.error) { return res.status(400).json(validate.error) };
        const { _id: owner } = req.user;
        const newContact = await Contact.create({ name, phone, email, favorite, owner });
        return res.status(201).json({
            status: "success",
            data: newContact
        });
    } catch (error) {
        next(error);
    }
};

module.exports = addContact;