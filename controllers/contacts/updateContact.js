const Joi = require('joi');
const Contact = require('../../models/contact.js')

const contactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
});

const updateContact = async (req, res, next) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const { _id: owner } = req.user;
        const validate = contactSchema.validate(
            body
        );
        if (validate.error) { return res.status(400).json(validate.error) };
        const contacts = await Contact.find({ owner }, "-createdAt -updatedAt");
        const contact = contacts.filter(contact => contact.id === id);
        if (!contact.length) {
            throw new Error('Contact not found');
        }
        const updatedContact = await Contact.findByIdAndUpdate(
            id,
            body,
            { new: true });
        if (!updatedContact) {
            throw new Error('Contact not found');
        }
        return res.status(201).json({
            status: "success",
            message: 'Contact updated',
            data: updatedContact
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = updateContact;